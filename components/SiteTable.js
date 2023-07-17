import { Box, Link } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./Table";
import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import DeleteFeedbackButton from "./DeleteFeedbackButton";
import DeleteSiteButton from "./DeleteSiteButton";

const SiteTable = ({ sites }) => {
  return (
    <Box overflowX={'scroll'}>
      <Table w={"full"}>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th w={"50px"}>{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <Box as="tr" key={site.id}>
              <Td>
                <Link
                  as={NextLink}
                  href={`/site/${site.id}`}
                  passHref
                  fontWeight="medium"
                >
                  {site.name}
                </Link>
              </Td>
              <Td>
                <Link href={site.url} isExternal>
                  {site.url}
                </Link>
              </Td>
              <Td>
                <Link
                  as={NextLink}
                  href={`/site/${site.id}`}
                  passHref
                  color="blue.500"
                  fontWeight="medium"
                >
                  View Feedback
                </Link>
              </Td>
              <Td>{format(parseISO(site.createdAt), "PPpp")}</Td>
              <Td><DeleteSiteButton siteId={site.id} /></Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
