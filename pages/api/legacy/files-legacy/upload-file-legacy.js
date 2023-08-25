import {Configuration, OpenAIApi} from "openai";

export default async function (req, res) {

    console.log(req.body.file)
    console.log(req.body.apiKey)

    const fs = require('fs');

    async function uploadFile(file) {
        console.log(file)

        const configuration = new Configuration({
            apiKey: req.body.apiKey
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createFile(
            fs.createReadStream("completions.jsonl"),
            "fine-tune")

        console.log(response.data)

        res.status(200).json({
            result: response.data
        });
    }

    let data = "{\"prompt\":\"How many are in a dozen?\", \"completion\":\"12\"}";

    fs.writeFile("completions.jsonl", data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("completions.jsonl", "utf8"));
            uploadFile("completions.jsonl")
        }
    });


}