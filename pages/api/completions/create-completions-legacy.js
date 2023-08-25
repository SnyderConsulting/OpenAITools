import {Configuration, OpenAIApi} from 'openai';

export default async function (req, res) {
    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);

    const prompt = {
        model: req.body.model,
        prompt: req.body.prompt,
        max_tokens: req.body.max_tokens,
        temperature: req.body.temperature,
        top_p: req.body.top_p,
        n: req.body.n,
        stream: req.body.stream,
        logprobs: req.body.logprobs,
        echo: req.body.echo,
        stop: req.body.stop,
        presence_penalty: req.body.presence_penalty,
        frequency_penalty: req.body.frequency_penalty,
        best_of: req.body.best_of,
        logit_bias: req.body.logit_bias,
        user: req.body.user
    };

    const response = await openai.createCompletion(prompt);

    console.log(response.data);

    res.status(200).json({
        result: response.data
    });
};