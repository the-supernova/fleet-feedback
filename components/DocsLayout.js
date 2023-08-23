const { Box } = require("@chakra-ui/react");

export default function DocsLayout({ children }) {
  return (
    <Box maxW={"650px"} mx="auto" px={8}>
      {children}
    </Box>
  );
}
