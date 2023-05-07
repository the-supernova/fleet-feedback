import { Flex, Heading, Text } from "@chakra-ui/react";
import AddSiteModal from "./AddSiteModal";

export default function EmptyState() {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      align="center"
      justify="center"
      direction="column"
    >
      <Heading size="lg" mb={2}>
        You haven't added any sites.
      </Heading>
      <Text mb={4}>Welcome 👋 Let's get started</Text>
      <AddSiteModal>
        Add Your First Site
      </AddSiteModal>
    </Flex>
  );
}
