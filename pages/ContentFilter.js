import {Button, Text, Textarea, VStack} from "@chakra-ui/react";
import {useState} from "react";

const ContentFilterPage = ({apiKey, baseUrl}) => {

    const [content, setContent] = useState()
    const [sexualFlag, setSexualFlag] = useState()
    const [hateFlag, setHateFlag] = useState()
    const [violenceFlag, setViolenceFlag] = useState()
    const [selfHarmFlag, setSelfHarmFlag] = useState()
    const [sexualMinorsFlag, setSexualMinorsFlag] = useState()
    const [hateThreateningFlag, setHateThreateningFlag] = useState()
    const [violenceGraphicFlag, setViolenceGraphicFlag] = useState()
    const [flagged, setFlagged] = useState()

    const clearAll = () => {
        setFlagged(undefined)
        setSexualFlag(undefined)
        setHateFlag(undefined)
        setViolenceFlag(undefined)
        setSelfHarmFlag(undefined)
        setSexualMinorsFlag(undefined)
        setHateThreateningFlag(undefined)
        setViolenceGraphicFlag(undefined)
    }

    async function getContentFilterScore() {
        const response = await fetch(`${baseUrl}/content-filter/get-content-filter-score`, {
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
        setSexualFlag(data.result.categories["sexual"])
        setHateFlag(data.result.categories["hate"])
        setViolenceFlag(data.result.categories["violence"])
        setSelfHarmFlag(data.result.categories["self-harm"])
        setSexualMinorsFlag(data.result.categories["sexual/minors"])
        setHateThreateningFlag(data.result.categories["hate/threatening"])
        setViolenceGraphicFlag(data.result.categories["violence/graphic"])
        setFlagged(data.result.flagged)
    }

    return (
        <VStack h={"100%"} w={"100%"} paddingTop={"64px"} spacing={"24px"}>
            <Text>Content Filter</Text>
            <Textarea
                maxW={"80%"}
                height={"200px"}
                placeholder={"Enter text..."}
                value={content}
                onChange={(e) => {
                    clearAll()
                    setContent(e.target.value)
                }}
            />
            <Button onClick={() => {
                getContentFilterScore()
            }}>Submit</Button>
            {flagged === false && <Text>Safe / Not Flagged</Text>}
            {
                flagged && (
                    <>
                        <Text>Flagged for the following reasons:</Text>
                        {sexualFlag && <Text>Sexual Content</Text>}
                        {hateFlag && <Text>Hateful Content</Text>}
                        {violenceFlag && <Text>Violent Content</Text>}
                        {selfHarmFlag && <Text>Self-Harm Content</Text>}
                        {sexualMinorsFlag && <Text>Sexual/Minors Content</Text>}
                        {hateThreateningFlag && <Text>Hateful/Threatening Content</Text>}
                        {violenceGraphicFlag && <Text>Graphically Violent Content</Text>}
                    </>
                )
            }

        </VStack>
    )
}

export default ContentFilterPage