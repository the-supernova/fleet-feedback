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
import { deleteFeedback } from "../lib/db";
import { useSWRConfig } from "swr";

export default function RemoveButton({ feedbackId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { mutate } = useSWRConfig();

  const onDelete = () => {
    deleteFeedback(feedbackId);
    mutate(["/api/feedback"], async data => {
        return { feedback: data.feedback.filter(feedback => feedback.id !== feedbackId) }
      }, false);
    onClose();
  }

  return (
    <>
      <IconButton aria-label="Delete feedback" icon={<RiDeleteBin5Fill />} variant="ghost" onClick={onOpen} ml={2} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
