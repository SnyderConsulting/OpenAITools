import {Configuration, OpenAIApi} from "openai";

export default async function (req, res) {

    const configuration = new Configuration({
        apiKey: req.body.apiKey
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion(
        "content-filter-alpha",
        {
            prompt: `<|endoftext|>${req.body.content}\n--\nLabel:`,
            temperature: 0,
            max_tokens: 1,
            top_p: 0,
            logprobs: 10
        }
    )

    console.log(response.data["choices"])

    res.status(200).json({
        result: getScore(response.data)
    });
}

const getScore = (response) => {
    let outputLabel = response["choices"][0]["text"]

    // This is the probability at which we evaluate that a "2" is likely real
    // vs. should be discarded as a false positive
    const toxicThreshold = -0.355

    if (outputLabel === "2") {
        // If the model returns "2", return its confidence in 2 or other output-labels
        const logprobs = response["choices"][0]["logprobs"]["top_logprobs"][0]
        const logprob0 = logprobs["0"]
        const logprob1 = logprobs["1"]
        const logprob2 = logprobs["2"]

        // If the model is not sufficiently confident in "2",
        // choose the most probable of "0" or "1"
        // Guaranteed to have a confidence for 2 since this was the selected token.
        if (logprob2 < toxicThreshold) {
            // If both "0" and "1" have probabilities, set the output label
            // to whichever is most probable
            if (logprob0 !== undefined && logprob1 !== undefined) {
                if (logprob0 >= logprob1) {
                    outputLabel = "0"
                } else {
                    outputLabel = "1"
                }
            //If only one of them is found, set output label to that one
            } else if (logprob0 !== undefined) {
                outputLabel = "0"
            } else if (logprob1 !== undefined) {
                outputLabel = "1"
            }

            // If neither "0" or "1" are available, stick with "2"
            // by leaving output_label unchanged.
        }
    }

    // if the most probable token is none of "0", "1", or "2"
    // this should be set as unsafe
    // if output_label not in ["0", "1", "2"]:
    if (!["0", "1", "2"].includes(outputLabel)) {
        outputLabel = "2"
    }

    return outputLabel
}