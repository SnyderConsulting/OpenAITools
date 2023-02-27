import {Box, Button, HStack, Text, Textarea, VStack} from "@chakra-ui/react";
import {useState} from "react";

const ContentFilterPage = ({apiKey}) => {

    const [content, setContent] = useState()
    const [score, setScore] = useState()
    const labels = [
        "Safe",
        "Sensitive",
        "Unsafe"
    ]

    async function getContentFilterScore() {
        const response = await fetch(`https://www.openaitools.com/api/content-filter/get-content-filter-score`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: apiKey,
                content: content
            }),
        });
        const data = await response.json();
        console.log(data.result)
        setScore(data.result)
    }

    return (
        <VStack h={"100%"} w={"100%"} paddingTop={"64px"} spacing={"24px"}>
            {
                score &&
                <Text>Content Filter: {score} ({labels[score]})</Text>
            }
            {
                !score &&
                <Text>Content Filter</Text>
            }
            <Textarea
                maxW={"80%"}
                height={"200px"}
                placeholder={"Enter text..."}
                value={content}
                onChange={(e) => {
                    setScore(undefined)
                    setContent(e.target.value)
                }}
            />
            <Button onClick={() => {getContentFilterScore()}} >Submit</Button>
        </VStack>
    )
}

export default ContentFilterPage