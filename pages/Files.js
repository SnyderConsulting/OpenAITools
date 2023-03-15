import {useState} from "react";
import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";

const FilesPage = ({apiKey, baseUrl}) => {

    const [files, setFiles] = useState([])
    const [stagedFile, setStagedFile] = useState()

    async function loadFiles() {
        const response = await fetch(`${baseUrl}/files/get-files`, {
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
        setFiles(data.result)
    }

    async function retrieveFileContent(fileId) {
        console.log(fileId)
        const response = await fetch(`${baseUrl}/files/retrieve-file-content`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: apiKey,
                file: fileId
            }),
        });
        const data = await response.json();
        console.log(data.result)
    }

    async function deleteFile(fileId) {
        console.log(fileId)
        const response = await fetch(`${baseUrl}/files/delete-file`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: apiKey,
                file: fileId
            }),
        });
        const data = await response.json();
        console.log(data.result)
        if (data.result.deleted === true) {
            await loadFiles()
        }
    }

    async function uploadFile(file) {
        console.log(file)
        const response = await fetch(`${baseUrl}/files/upload-file`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: apiKey,
                file: file
            }),
        });
        const data = await response.json();
        console.log(data.result)
        if (data.result.status === 'uploaded') {
            await loadFiles()
        }
    }

    return (
        <VStack h={"100%"} w={"100%"} paddingY={"128px"}>
            <Button style={{marginTop: "128px", marginBottom: "48px"}}
                    onClick={() => {
                        loadFiles()
                    }}
            >
                Load Files
            </Button>
            {
                files.length > 0 &&
                <Text>{`Files (${files.map(file => file.bytes).reduce((prev, next) => prev + next).toLocaleString("en-US")} / 1,073,741,824 bytes)`}</Text>
            }
            {
                files.length === 0 &&
                <Text>Files</Text>
            }
            <VStack spacing={"16px"} maxHeight={"500px"} overflow='scroll'>
                {files.map((file) => {
                    return (
                        <FileCard
                            file={file}
                            getFileDetails={retrieveFileContent}
                            deleteFile={deleteFile}
                        />
                    )
                })}
            </VStack>

            <input type="file" id="file-selector" accept=".jsonl" onChange={(e) => {
                const fileList = e.target.files;
                const file = fileList[0]

                // const reader = new FileReader();
                // reader.addEventListener('load', (event) => {
                //     console.log(event.target.result)
                // });
                // reader.readAsText(file);
                setStagedFile(file)
            }}/>
            {
                uploadFile &&
                    <Button onClick={() => {uploadFile(stagedFile)}}>Upload File</Button>
            }
        </VStack>
    )
}

const timeToDate = (time) => {
    const date = new Date(time); // create Date object

    return date.toGMTString()
}



const FileCard = ({file, getFileDetails, deleteFile}) => {
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' padding={"24px"}>
            <VStack alignItems={"start"} spacing={"8px"}>
                <Text>ID: {file.id}</Text>
                <Text>Purpose: {file.purpose}</Text>
                <Text>Filename: {file.filename}</Text>
                <Text>Bytes: {file.bytes.toLocaleString("en-US")}</Text>
                <Text>Created At: {timeToDate(file.created_at * 1000)}</Text>
                <Text>Status: {file.status}</Text>
                <Text>Status Details: {file.status_details}</Text>
                <HStack width={"100%"} display={"flex"} justifyContent={"end"} spacing={"16px"}>
                    <Button onClick={() => {getFileDetails(file.id)}}>Get Details</Button>
                    <Button colorScheme='red' onClick={() => {deleteFile(file.id)}}>Delete</Button>
                </HStack>
            </VStack>
        </Box>
    )
}

export default FilesPage