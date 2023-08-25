import fs from "fs";
import {Configuration, OpenAIApi} from 'openai';

export default async function (req, res) {
    const configuration = new Configuration({apiKey: req.body.apiKey});
    const openai = new OpenAIApi(configuration);

    const file = fs.createReadStream(req.body.fileName);
    const purpose = req.body.purpose;

    const response = await openai.files.create({file, purpose});

    console.log(response.data);

    res.status(200).json({result: response.data});
};