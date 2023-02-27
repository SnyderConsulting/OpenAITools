import {Box, Link, Text} from "@chakra-ui/react";

export const Header = () => {
    return (
        <Box w={"100vw"} h={"72px"} display={"flex"} justifyContent={"center"} alignItems={"center"} boxShadow={"md"}>
            <Text>
                Open AI Tools is an open source project created & managed
                by {Linkify("Snyder Consulting, LLC", "https://www.snyderconsulting.tech")}.
                Contribute {Linkify("here", "https://github.com/SnyderConsulting/OpenAITools")}
            </Text>
        </Box>
    )
}

const Linkify = (body, url) => {
    return (
        <Link color='teal.500' href={url}>{body}</Link>
    )
}