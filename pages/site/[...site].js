import { Box, Button, FormControl, Textarea } from "@chakra-ui/react";
import Feedback from "../../components/Feedback";
import { getAllFeedback, getAllSites, getSite } from "../../lib/db-admin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { createFeedback } from "../../lib/db";
import DashboardShell from "../../components/DashboardShell";
import LoginButtons from "../../components/LoginButtons";
import SiteFeedbackTableHeader from "../../components/SiteFeedbackTableHeaders";

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()],
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const FeedbackPage = ({ initialFeedback, site }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [siteId, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      route: route || "/",
      author: session.user.name,
      authorId: session.user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: session.user.provider,
      status: "pending",
    };

    inputEl.current.value = "";
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  const LoginOrLeaveFeedback = () => {
    if (status === "loading") {
      return null;
    }
    if (status === "authenticated") {
      return (
        <Button
          type="submit"
          backgroundColor={"gray.900"}
          color={"white"}
          _hover={{ bg: "gray.700" }}
          _active={{
            bg: "gray.800",
            transform: "scale(0.95)",
          }}
          mt={4}
          fontWeight="medium"
          isDisabled={router.isFallback}
        >
          Leave Feedback
        </Button>
      );
    }
    return <LoginButtons />;
  }

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader
        isSiteOwner={true}
        site={site}
        siteId={siteId}
        route={route}
      />
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        mx={4}
      >
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl mb={8}>
            <Textarea
              ref={inputEl}
              id="comment"
              placeholder="Leave a comment"
              h="100px"
              colorScheme="blue"
            />
            <LoginOrLeaveFeedback />
          </FormControl>
        </Box>
        {allFeedback &&
          allFeedback.map((feedback, index) => (
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          ))}
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
