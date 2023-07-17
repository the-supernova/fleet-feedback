import { Box, Code, Switch } from "@chakra-ui/react";
import { Td } from "./Table";
import DeleteFeedbackButton from "./DeleteFeedbackButton";
import { updateFeedback } from "../lib/db";
import { useSWRConfig } from "swr";

export default function FeedbackRow({ id, author, text, route, status }) {
  const { mutate } = useSWRConfig();
  const isChecked = status === "active";

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: isChecked ? "pending" : "active" });
    mutate(["/api/feedback"]);
  };
  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || "/"}</Code>
      </Td>
      <Td>
        <Switch
          colorScheme="green"
          isChecked={isChecked}
          onChange={toggleFeedback}
        />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
}
