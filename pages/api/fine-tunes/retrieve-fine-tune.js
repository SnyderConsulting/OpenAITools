import {Configuration, OpenAIApi} from "openai";

export default async function (req, res) {

    console.log(req.body.fileId)

    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.retrieveFineTune(req.body.fileId)

    openai.

    res.status(200).json({
        result: response
    });

    console.log(response)
}