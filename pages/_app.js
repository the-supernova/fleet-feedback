import { SessionProvider } from "next-auth/react";
import { CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { customTheme } from "../styles/theme";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "../components/MDXComponents";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={extendTheme(customTheme)}>
        <MDXProvider components={MDXComponents}>
          <CSSReset />
          <Component {...pageProps} />
        </MDXProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
