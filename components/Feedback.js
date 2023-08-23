import {
  Box,
  Code,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "../utils/useTheme";
import ReactMarkdown from "react-markdown";
import MDXComponents from "./MDXComponents";

const { format, parseISO } = require("date-fns");

const Feedback = ({ author, text, createdAt, provider, isLast, settings }) => {
  const colorMode = useTheme();
  const authorColor = {
    light: "gray.900",
    dark: "gray.200",
  };
  const textColor = {
    light: "gray.800",
    dark: "gray.300",
  };
  const dividerColor = {
    light: "gray.200",
    dark: "gray.700",
  };
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align={"center"}>
        <Heading
          size="sm"
          as="h3"
          mb={0}
          color={authorColor[colorMode]}
          fontWeight="medium"
        >
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
      <Box color={textColor[colorMode]}>
        <ReactMarkdown
          // eslint-disable-next-line react/no-children-prop
          children={text}
          components={{
            h1: MDXComponents.h1,
            h2: MDXComponents.h2,
            paragraph: MDXComponents.p,
            blockquote: MDXComponents.blockquote,
            link: MDXComponents.a,
            list: MDXComponents.ul,
            listItem: MDXComponents.li,
            table: MDXComponents.table,
            tableHead: MDXComponents.th,
            tableCell: MDXComponents.td,
            code: ({ value }) => (
              <pre>
                <Code borderRadius={8} p={4} my={4}>
                  {value}
                </Code>
              </pre>
            ),
            inlineCode: MDXComponents.inlineCode,
          }}
        />
      </Box>
      {!isLast && <Divider borderColor={dividerColor[colorMode]} my={6} />}
    </Box>
  );
};

export default Feedback;
