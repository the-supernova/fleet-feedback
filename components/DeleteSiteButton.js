import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteSite } from "../lib/db";
import { useSWRConfig } from "swr";

export default function DeleteSiteButton({ siteId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { mutate } = useSWRConfig();

  const onDelete = () => {
    deleteSite(siteId);
    mutate(["/api/sites"], async data => {
        return { sites: data.sites.filter(site => site.id !== siteId) }
      }, false);
    onClose();
  }

  return (
    <>
      <IconButton aria-label="Delete site" icon={<RiDeleteBin5Fill />} variant="ghost" onClick={onOpen} ml={2} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Site
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will also delete all feedback lef on the site. You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" fontWeight="bold" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
