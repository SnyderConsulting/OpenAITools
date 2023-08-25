import {Box, Button, HStack, SimpleGrid, Text, useBreakpointValue, VStack} from "@chakra-ui/react";
import {useState} from "react";

const FineTuningPage = ({apiKey, baseUrl}) => {

    const [fineTunes, setFineTunes] = useState([])

    async function loadFineTunes() {
        const response = await fetch(`${baseUrl}/fine-tunes/get-fine-tunes`, {
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
        setFineTunes(data.result)
    }

    async function getFineTuneDetails(fileId) {
        console.log(fileId)

        const response = await fetch(`${baseUrl}/fine-tunes/retrieve-fine-tune`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: apiKey,
                fileId: fileId
            }),
        });
        const data = await response.json();
        console.log(data.result)
        // setFineTunes(data.result)
    }

    async function deleteFineTune(model) {
        console.log(model)
        const response = await fetch(`${baseUrl}/fine-tunes/delete-fine-tune`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: apiKey,
                model: model
            }),
        });
        const data = await response.json();
        console.log(data.result)
        // if (data.result.deleted === true) {
        //     await loadFineTunes()
        // }
    }

    const columnCount = useBreakpointValue({base: 1, lg: 2, xl: 3});

    return (
        <VStack h={"100%"} w={"100%"} paddingY={"128px"} spacing={8}>
            <Box>
                <Button style={{marginTop: "128px", marginBottom: "48px"}}
                        onClick={() => {
                            loadFineTunes()
                        }}
                >
                    Load Fine-Tunes
                </Button>
            </Box>

            <Text>Fine Tunes</Text>
            <SimpleGrid columns={columnCount} spacing={10}>
                {fineTunes.map((fineTune) => {
                    return (
                        <FineTuneCard
                            fineTune={fineTune}
                            getFineTuneDetails={getFineTuneDetails}
                            deleteFineTune={deleteFineTune}
                        />
                    )
                })}
            </SimpleGrid>
        </VStack>
    )
}

const timeToDate = (time) => {
    const date = new Date(time); // create Date object

    return date.toGMTString()
}



const FineTuneCard = ({fineTune, getFineTuneDetails, deleteFineTune}) => {
    console.log(fineTune.fine_tuned_model)
    return (
        <Box maxW='sm' minw='sm' borderWidth='1px' borderRadius='lg' padding={"24px"}>
            <VStack alignItems={"start"} spacing={"8px"}>
                <Text>ID: {fineTune.id}</Text>
                <Text>Object: {fineTune.object}</Text>
                <Text>Model: {fineTune.model}</Text>
                <Text>Created At: {timeToDate(fineTune.created_at * 1000)}</Text>
                <Text>Updated At: {timeToDate(fineTune.updated_at * 1000)}</Text>
                <Text>Fine Tuned Model: {fineTune.fine_tuned_model}</Text>
                {/*<Text>Hyper Params: {fineTune.hyperparams}</Text>*/}
                <Text>Organization ID: {fineTune.organization_id}</Text>
                <Text>Status: {fineTune.status}</Text>
                {/*<Text>Training Files: {fineTune.training_files}</Text>*/}
                {/*<Text>Validation Files: {fineTune.validation_files}</Text>*/}
                {/*<Text>Result Files: {fineTune.result_files}</Text>*/}
                <HStack width={"100%"} display={"flex"} justifyContent={"end"} spacing={"16px"}>
                    <Button onClick={() => {getFineTuneDetails(fineTune.id)}}>Get Details</Button>
                    <Button colorScheme='red' onClick={() => {deleteFineTune(fineTune.id)}}>Delete</Button>
                </HStack>
            </VStack>
        </Box>
    )
}

/*
{
      "id": "ft-AF1WoRqd3aJAHsqc9NY7iL8F",
      "object": "fine-tune",
      "model": "curie",
      "created_at": 1614807352,
      "fine_tuned_model": null,
      "hyperparams": { ... },
      "organization_id": "org-...",
      "result_files": [],
      "status": "pending",
      "validation_files": [],
      "training_files": [ { ... } ],
      "updated_at": 1614807352,
    },
}
 */

export default FineTuningPage