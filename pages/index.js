import Head from "next/head";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { getAllFeedback, getSite } from "../lib/db-admin";
import Script from "next/script";
import FeedbackLink from "../components/FeedbackLink";
import Feedback from "../components/Feedback";
import LoginButtons from "../components/LoginButtons";

const SITE_ID = "lIlh6QbYfPNo4KHnQ81W";

export default function Home({ allFeedback, site }) {
  const { data: session } = useSession();

  return (
    <>
      <Box bg={"gray.100"} py={16}>
        <Flex as="main" direction={"column"} maxW={"700px"} margin={"0 auto"}>
          <Head>
            <title>Fleet Feedback</title>
            <meta
              name="description"
              content="Easiest way to add comments to your static site"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Script
            id="redirect-if-cookie"
            dangerouslySetInnerHTML={{
              __html: `
                if(document.cookie && document.cookie.includes('next-auth.session-token')) {
                  window.location.href = "/sites"
                }
                `,
            }}
          />
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Icon viewBox="0 0 46 32" color="black" boxSize="32px" mb={2}>
              <path
                d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
                fill="currentColor"
              />
            </Icon>
            <Button
              as="a"
              href="/docs"
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
              View Docs
            </Button>
          </Flex>
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Fleet Feedback
            </Text>
            {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
          </Text>
          {session ? (
            <Button
              as="a"
              href="/sites"
              backgroundColor={"gray.900"}
              color={"white"}
              fontWeight={"medium"}
              mt={4}
              maxW={"200px"}
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"full"}
        maxWidth={"700px"}
        margin={"0 auto"}
        mt={8}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => (
          <Feedback key={feedback.id} settings={site?.settings} isLast={index === allFeedback.length - 1} {...feedback} />
        ))}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
      site
    },
    revalidate: 1,
  };
}
