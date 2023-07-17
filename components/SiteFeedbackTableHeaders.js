import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";
import EditSiteModal from "./EditSiteModal";

export default function SiteFeedbackTableHeader({
  isSiteOwner,
  site,
  siteId,
  route,
}) {
  const siteName = site?.name;

  return (
    <Box mx={"4"}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href={"/sites"} passHref>
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href={`/site/${siteId}`} passHref>
            {siteName || "-"}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {siteName && route && (
          <BreadcrumbItem>
            <BreadcrumbLink
              as={NextLink}
              href={`/site/${siteId}/${route}`}
              passHref
            >
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{siteName || "-"}</Heading>
        {isSiteOwner && (
          <EditSiteModal settings={site?.settings} siteId={siteId}>
            Edit Site
          </EditSiteModal>
        )}
      </Flex>
    </Box>
  );
}
