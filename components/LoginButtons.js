import { Button, Stack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginButtons() {
    return (
        <Stack isInline>
            <Button
                onClick={() => signIn("github", { callbackUrl: '/sites' })}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon={<FiGithub />}
                _hover={{ bg: "gray.700" }}
                _active={{
                    bg: "gray.800",
                    transform: "scale(0.95)",
                }}
            >
                Sign In with GitHub
            </Button>
            <Button
                onClick={() => signIn("google", { callbackUrl: '/sites' })}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                leftIcon={<FcGoogle />}
                _hover={{ bg: "gray.100" }}
                _active={{
                    bg: "gray.100",
                    transform: "scale(0.95)",
                }}
            >
                Sign In with Google
            </Button>
        </Stack>
    )
}
