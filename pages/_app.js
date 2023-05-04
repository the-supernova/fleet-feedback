import { SessionProvider } from "next-auth/react";
import { CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { customTheme } from "../styles/theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ChakraProvider theme={extendTheme(customTheme)}>
      <SessionProvider session={session}>
        <CSSReset />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}
