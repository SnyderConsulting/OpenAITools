import {Button, Text, Textarea, VStack} from "@chakra-ui/react";
import {useState} from "react";

const ContentFilterPage = ({apiKey, baseUrl}) => {

    const [content, setContent] = useState()

    //Flags
    const [flagged, setFlagged] = useState()
    const [hateFlag, setHateFlag] = useState()
    const [hateThreateningFlag, setHateThreateningFlag] = useState()
    const [harassmentFlag, setHarassmentFlag] = useState()
    const [harassmentThreateningFlag, setHarassmentThreateningFlag] = useState()
    const [selfHarmFlag, setSelfHarmFlag] = useState()
    const [selfHarmIntentFlag, setSelfHarmIntentFlag] = useState()
    const [selfHarmInstructionsFlag, setSelfHarmInstructionsFlag] = useState()
    const [sexualFlag, setSexualFlag] = useState()
    const [sexualMinorsFlag, setSexualMinorsFlag] = useState()
    const [violenceFlag, setViolenceFlag] = useState()
    const [violenceGraphicFlag, setViolenceGraphicFlag] = useState()

    const clearAll = () => {
        setFlagged(undefined)
        setHateFlag(undefined)
        setHateThreateningFlag(undefined)
        setHarassmentFlag(undefined)
        setHarassmentThreateningFlag(undefined)
        setSelfHarmFlag(undefined)
        setSelfHarmIntentFlag(undefined)
        setSelfHarmInstructionsFlag(undefined)
        setSexualFlag(undefined)
        setSexualMinorsFlag(undefined)
        setViolenceFlag(undefined)
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

        setFlagged(data.result.flagged)
        setHateFlag(data.result.categories["hate"])
        setHateThreateningFlag(data.result.categories["hate/threatening"])
        setHarassmentFlag(data.result.categories["harassment"])
        setHarassmentThreateningFlag(data.result.categories["harassment/threatening"])
        setSelfHarmFlag(data.result.categories["self-harm"])
        setSelfHarmIntentFlag(data.result.categories["self-harm/intent"])
        setSelfHarmInstructionsFlag(data.result.categories["self-harm/instructions"])
        setSexualFlag(data.result.categories["sexual"])
        setSexualMinorsFlag(data.result.categories["sexual/minors"])
        setViolenceFlag(data.result.categories["violence"])
        setViolenceGraphicFlag(data.result.categories["violence/graphic"])
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
                        {hateFlag && <Text>Hateful Content</Text>}
                        {hateThreateningFlag && <Text>Hateful/Threatening Content</Text>}
                        {harassmentFlag && <Text>Harassment Content</Text>}
                        {harassmentThreateningFlag && <Text>Harassment/Threatening Content</Text>}
                        {selfHarmFlag && <Text>Self-Harm Content</Text>}
                        {selfHarmIntentFlag && <Text>Self-Harm Intent Content</Text>}
                        {selfHarmInstructionsFlag && <Text>Self-Harm Instruction Content</Text>}
                        {sexualFlag && <Text>Sexual Content</Text>}
                        {sexualMinorsFlag && <Text>Sexual/Minors Content</Text>}
                        {violenceFlag && <Text>Violent Content</Text>}
                        {violenceGraphicFlag && <Text>Graphically Violent Content</Text>}
                    </>
                )
            }

        </VStack>
    )
}

export default ContentFilterPage