import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Feedback from "../../components/Feedback";
import { getAllFeedback, getAllSites } from "../../lib/db-admin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { createFeedback } from "../../lib/db";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      author: session.user.name,
      authorId: session.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: session.user.provider,
      status: "pending",
    };

    inputEl.current.value = "";
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl my={8}>
          <FormLabel>Comment</FormLabel>
          <Input ref={inputEl} type="text" />
          <Button
            mt={2}
            type="submit"
            fontWeight="medium"
            isDisabled={router.isFallback}
          >
            Add Comment
          </Button>
        </FormControl>
      </Box>

      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
    </Box>
  );
};

export default SiteFeedback;
