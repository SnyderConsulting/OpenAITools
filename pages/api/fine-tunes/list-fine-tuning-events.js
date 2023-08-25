import {Configuration, OpenAIApi} from 'openai';

export default async function (req, res) {
    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);

    const jobId = req.params.fine_tuning_job_id;
    const parameters = {
        after: req.body.after,
        limit: req.body.limit
    }

    const response = await openai.fineTuning.jobs.listEvents(jobId, parameters);

    console.log(response.data);

    res.status(200).json({
        result: response.data
    });
};