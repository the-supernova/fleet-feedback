import { SessionProvider } from "next-auth/react";
import { CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { customTheme } from "../styles/theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={extendTheme(customTheme)}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
