import {Box, Button, HStack, Input, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";
import FilesPage from "./Files";
import FineTuningPage from "./FineTuning";
import ModelsPage from "./Models";
import ContentFilterPage from "./ContentFilter";
import {Header} from "../components/Header";

function Main() {
    const [apiKey, setApiKey] = useState()
    const [selectedPage, setSelectedPage] = useState(0)

    const pages = [
        {name: "Files", component: <FilesPage apiKey={apiKey}/>},
        {name: "Fine-Tunes", component: <FineTuningPage apiKey={apiKey}/>},
        {name: "Models", component: <ModelsPage apiKey={apiKey}/>},
        {name: "Content Filter", component: <ContentFilterPage apiKey={apiKey}/>},
    ]


    return (
        <VStack>
            <Header/>
            <HStack h={"100vh"} w={"100vw"}>
                <NavMenu pages={pages} selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
                <VStack height={"100%"} width={"100%"}>
                    <APIKeyInput apiKey={apiKey} setApiKey={setApiKey}/>
                    {pages[selectedPage].component}
                </VStack>
            </HStack>
        </VStack>
    );
}

const NavMenu = ({pages, selectedPage, setSelectedPage}) => {
    return (
        <VStack h={"100vh"} w={"200px"} p={"16px"} borderRight={"1px"}>
            {
                pages.map((page, index) => {
                    return <Button
                        width={"100%"}
                        colorScheme={selectedPage === index ? "green" : "gray"}
                        cursor={"pointer"}
                        onClick={() => {
                            setSelectedPage(index)
                        }}
                    >
                        {page.name}
                    </Button>
                })
            }
        </VStack>
    )
}

const APIKeyInput = ({apiKey, setApiKey}) => {
    return (
        <VStack>
            <Text>OpenAI API Key</Text>
            <Input
                w={"550px"}
                placeholder={"OpenAI API Key"}
                value={apiKey}
                onChange={(e) => {
                    setApiKey(e.target.value)
                }}
            />
        </VStack>
    )
}

export default Main;