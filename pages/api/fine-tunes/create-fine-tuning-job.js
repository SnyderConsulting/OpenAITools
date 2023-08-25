import {Configuration, OpenAIApi} from 'openai';

export default async function (req, res) {
    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);

    const jobDetails = {
        training_file: req.body.training_file,
        validation_file: req.body.validation_file,
        model: req.body.model,
        hyperparameters: req.body.hyperparameters,
        suffix: req.body.suffix
    };

    const response = await openai.fineTuning.jobs.create(jobDetails);

    console.log(response.data);

    res.status(200).json({
        result: response.data
    });
};