import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function FeedbackTableHeader() {
  return (
    <Box mx={"4"}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link
            as={NextLink}
            href={"/feedback"}
            passHref
          >
            <BreadcrumbLink>Feedback</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>All Feedback</Heading>
      </Flex>
    </Box>
  );
}
