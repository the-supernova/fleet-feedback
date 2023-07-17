import { Box, Button, FormControl, Textarea } from "@chakra-ui/react";
import Feedback from "../../components/Feedback";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { createFeedback } from "../../lib/db";
import DashboardShell from "../../components/DashboardShell";
import LoginButtons from "../../components/LoginButtons";
import SiteFeedbackTableHeader from "../../components/SiteFeedbackTableHeaders";
import fetcher from "../../utils/fetcher";
import useSWR, { useSWRConfig } from "swr";

const FeedbackPage = () => {
  const { mutate } = useSWRConfig();
  const { data: session, status } = useSession();
  const router = useRouter();
  const inputEl = useRef(null);
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site.authorId,
      route: route || "/",
      author: session.user.name,
      authorId: session.user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: session.user.provider,
      status: "pending",
    };

    inputEl.current.value = "";
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({ feedback: [newFeedback, ...data.feedback] }),
      false
    );
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
          isDisabled={!siteData || !feedbackData}
        >
          Leave Feedback
        </Button>
      );
    }
    return <LoginButtons />;
  };

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader
        isSiteOwner={site?.authorId === session?.user?.uid}
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
              isDisabled={!session}
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
