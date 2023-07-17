import { Box, Divider, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const { format, parseISO } = require("date-fns");

const Feedback = ({ author, text, createdAt, provider, isLast, settings }) => (
  <Box borderRadius={4} maxWidth="700px" w="full">
    <Flex align={"center"}>
      <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
        {author}
      </Heading>
      {settings?.icons && (
        <Icon
          as={provider === "github" ? FiGithub : FcGoogle}
          color="gray.500"
          ml="6px"
        />
      )}
    </Flex>
    {settings?.timestamp && (
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), "PPpp")}
      </Text>
    )}
    <Text color="gray.800">{text}</Text>
    {!isLast && (
      <Divider borderColor="gray.200" backgroundColor="gray.200" my={6} />
    )}
  </Box>
);

export default Feedback;
