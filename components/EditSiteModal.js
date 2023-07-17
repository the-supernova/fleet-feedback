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
  useDisclosure,
  Button,
  useToast,
  Switch,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { updateSite } from "../lib/db";

export default function EditSiteModal({ settings, siteId, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useSWRConfig();

  const toast = useToast();

  const {
    handleSubmit,
    register
  } = useForm();

  const updateSiteUtil = async (newSettings) => {
    await updateSite(siteId, {
        settings: newSettings
    });
    toast({
      title: "Success!.",
      description: "We've updated your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    mutate(
      [`/api/sites/${siteId}`],
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
        leftIcon={<SettingsIcon />}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(updateSiteUtil)}>
          <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl display='flex' alignItems={'center'}>
              <Switch
                key={settings?.timestamp}
                name="timestamp"
                colorScheme={"green"}
                defaultChecked={settings?.timestamp}
                {...register("timestamp")}
                />
                <FormLabel ml={2} mb={0} htmlFor="timestamp">Show Timestamp</FormLabel>
            </FormControl>
            <FormControl display='flex' alignItems={'center'}>
                <Switch
                key={settings?.icons}
                name="icons"
                colorScheme={"green"}
                defaultChecked={settings?.icons}
                {...register("icons")}
                />
                <FormLabel ml={2} mb={0} htmlFor="icons">Show Icons</FormLabel>
            </FormControl>
            <FormControl display='flex' alignItems={'center'}>
                <Switch
                key={settings?.ratings}
                name="ratings"
                colorScheme={"green"}
                defaultChecked={settings?.ratings}
                {...register("ratings")}
                />
                <FormLabel ml={2} mb={0} htmlFor="ratings">Show Ratings</FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button type="submit" fontWeight="medium" backgroundColor="#99FFFE" color="#194D4C">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
