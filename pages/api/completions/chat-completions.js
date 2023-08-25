import {Configuration, OpenAIApi} from 'openai';

export default async function (req, res) {
    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);

    const prompt = {
        model: req.body.model,
        messages: req.body.messages,
        functions: req.body.functions,
        function_call: req.body.function_call,
        temperature: req.body.temperature,
        top_p: req.body.top_p,
        n: req.body.n,
        stream: req.body.stream,
        stop: req.body.stop,
        max_tokens: req.body.max_tokens,
        presence_penalty: req.body.presence_penalty,
        frequency_penalty: req.body.frequency_penalty,
        logit_bias: req.body.logit_bias,
        user: req.body.user
    };

    const response = await openai.createChatCompletion(prompt);

    console.log(response.data);

    res.status(200).json({
        result: response.data
    });
};