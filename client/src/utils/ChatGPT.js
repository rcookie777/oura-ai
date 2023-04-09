import axios from "axios";

const API_KEY = "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";

export const fetchResponse = async (input, context) => {
    const contextData = JSON.stringify(context);
    const gptPrompt=[
        {"role": "system", "content": `This is the users health data: ${contextData}`},
        {"role": "user", "content": `As Oura Ai respond to this question "${input}"`},
        // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        //{"role": "user", "content": "Where was it played?"}
    ];
    console.log(gptPrompt)
    try{
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            // "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
            model: "gpt-3.5-turbo",
            messages: gptPrompt,
            max_tokens: 500,
            temperature: 0.5,
            },
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            }
        ).catch(error => console.log(error.response));

        console.log("OPENAI",response);

        const text = response.data.choices[0].message.content;
        // Add a delay of 1 second before returning the response
        await new Promise(resolve => setTimeout(resolve, 1000));

        return text;
    } catch (error) {
        console.log(error);
        return "Error: Unable to fetch response from AI"
    }
  };