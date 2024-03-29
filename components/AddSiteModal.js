import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { createSite } from "../lib/db";
import { useSession } from "next-auth/react";

export default function AddSiteModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const initialRef = useRef(null);
  const toast = useToast();

  const {
    handleSubmit,
    register
  } = useForm();

  const createSiteUtil = async ({ name, url }) => {
    const newSite = {
      authorId: session.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
      settings: {
        icons: true,
        timestamp: true,
        ratings: false,
      }
    };
    const { id } = await createSite(newSite);
    toast({
      title: "Success!.",
      description: "We've added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    mutate(
      ["/api/sites"],
      async (data) => ({ sites: [{ id, ...newSite }, ...data.sites] }),
      false
    );
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(createSiteUtil)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="My site"
                {...register("name", {
                  required: "Required",
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                {...register("url", {
                  required: "Required",
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button type="submit" backgroundColor="#99FFFE" color="#194D4C">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
