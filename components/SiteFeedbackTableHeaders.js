import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function SiteFeedbackTableHeader({ siteName }) {
  return (
    <Box mx={"4"}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href={"/feedback"} passHref>
            Feedback
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{siteName || "-"}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{siteName || "-"}</Heading>
      </Flex>
    </Box>
  );
}
