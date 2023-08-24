const { Box, Flex, Icon, Button } = require("@chakra-ui/react");

export default function DocsLayout({ children }) {
  return (
    <Box maxW={"650px"} mx="auto" px={8}>
      <Flex mt={'4'} alignItems={"center"} justifyContent={"space-between"}>
        <Icon viewBox="0 0 46 32" color="black" boxSize="32px" mb={2}>
          <path
            d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
            fill="currentColor"
          />
        </Icon>
        <Button
          as="a"
          href="/"
          backgroundColor={"gray.900"}
          color={"white"}
          fontWeight={"medium"}
          maxW={"200px"}
          _hover={{ bg: "gray.700" }}
          _active={{
            bg: "gray.800",
            transform: "scale(0.95)",
          }}
        >
          Home
        </Button>
      </Flex>
      {children}
    </Box>
  );
}
