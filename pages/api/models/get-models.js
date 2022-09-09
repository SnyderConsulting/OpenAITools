import {Configuration, OpenAIApi} from "openai";

export default async function (req, res) {

    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.listEngines()

    res.status(200).json({
        result: response.data.data
    });
}