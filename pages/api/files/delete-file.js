import {Configuration, OpenAIApi} from "openai";

export default async function (req, res) {

    console.log(req.body.file)
    console.log(req.body.apiKey)

    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.deleteFile(req.body.file)

    console.log(response.data)

    res.status(200).json({
        result: response.data
    });
}