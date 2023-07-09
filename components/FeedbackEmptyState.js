import { Flex, Heading, Text } from "@chakra-ui/react";

export default function FeedbackEmptyState() {
    return (
        <Flex
            width="100%"
            backgroundColor="white"
            borderRadius="8px"
            p={16}
            align="center"
            justify="center"
            direction="column"
        >
            <Heading size="lg" mb={2}>
                There isn't any feedback.
            </Heading>
            <Text mb={4}>Share your site!</Text>
        </Flex>
    )
}
