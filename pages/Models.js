import {Box, Button, SimpleGrid, Text, useBreakpointValue, VStack} from "@chakra-ui/react";
import {useState} from "react";

const ModelsPage = ({apiKey, baseUrl}) => {

    const [models, setModels] = useState([])

    async function loadModels() {
        const response = await fetch(`${baseUrl}/models/get-models`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: apiKey
            }),
        });
        const data = await response.json();
        console.log(data.result)
        setModels(data.result)
    }

    const columnCount = useBreakpointValue({base: 1, lg: 2, xl: 3});

    return (
        <VStack h={"100%"} w={"100%"} paddingY={"128px"} spacing={8}>

            <Box>
                <Button style={{marginTop: "128px", marginBottom: "48px"}}
                        onClick={() => {
                            loadModels()
                        }}
                >
                    Load Models
                </Button>
            </Box>

            <Text>Models</Text>

            <SimpleGrid columns={columnCount} spacing={10}>
                {models.map((model) => {
                    return (
                        <ModelCard
                            model={model}
                        />
                    )
                })}
            </SimpleGrid>
        </VStack>
    )
}

const ModelCard = ({model}) => {
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' padding={"24px"}>
            <VStack minW={"300px"} maxW={"300px"} alignItems={"start"} spacing={"8px"}>
                <Text>ID: {model.id}</Text>
                <Text>Object: {model.object}</Text>
                <Text>Owner: {model.owner}</Text>
                <Text>Ready: {model.ready ? "True" : "False"}</Text>
            </VStack>
        </Box>
    )
}

export default ModelsPage