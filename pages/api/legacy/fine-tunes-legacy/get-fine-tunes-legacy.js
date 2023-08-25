import {Configuration, OpenAIApi} from "openai";

export default async function (req, res) {

    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.listFineTunes()

    const sortedList = response.data.data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)

    console.log(sortedList)

    res.status(200).json({
        result: sortedList
    });
}