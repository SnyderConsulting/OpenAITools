import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";

const FineTuningPage = ({apiKey}) => {

    const [fineTunes, setFineTunes] = useState([])

    async function loadFineTunes() {
        const response = await fetch(`https://www.openaitools.com/api/fine-tunes/get-fine-tunes`, {
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

        const response = await fetch(`https://www.openaitools.com/api/fine-tunes/retrieve-fine-tune`, {
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
        const response = await fetch(`https://www.openaitools.com/api/fine-tunes/delete-fine-tune`, {
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

    loadFineTunes()

    return (
        <VStack h={"100%"} w={"100%"} paddingY={"128px"}>
            {/*<Button style={{marginTop: "128px"}}*/}
            {/*        onClick={() => {loadFineTunes()}}*/}
            {/*>*/}
            {/*    Get Fine-Tunes*/}
            {/*</Button>*/}
            <Text>Fine Tunes</Text>
            <VStack spacing={"16px"} maxHeight={"500px"} overflow='scroll'>
                {fineTunes.map((fineTune) => {
                    return (
                        <FineTuneCard
                            fineTune={fineTune}
                            getFineTuneDetails={getFineTuneDetails}
                            deleteFineTune={deleteFineTune}
                        />
                    )
                })}
            </VStack>
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
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' padding={"24px"}>
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