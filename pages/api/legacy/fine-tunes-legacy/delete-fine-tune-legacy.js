export default async function (req, res) {

    console.log(req.body)

    const url = `https://api.openai.com/v1/models/${req.body.model}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${req.body.apiKey}`
        }
    });

    console.log(response)

    res.status(200).json({
        result: response.data
    });
}