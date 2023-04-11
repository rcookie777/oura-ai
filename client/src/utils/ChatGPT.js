import axios from "axios";

const API_KEY = "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";

export const fetchResponse = async (input, context) => {
    const contextData = JSON.stringify(context);
    const gptPrompt=[
        {"role": "user", "content": `This is my health data: ${contextData}`},
        {"role": "user", "content": `Act as an expert in health and sleep respond to this input based on my health data "${input}" and suggest another question I can ask you to learn more about my health.`},
        // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        //{"role": "user", "content": "Where was it played?"}
    ];
    console.log("gptPrompt", gptPrompt);
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
        const text = response.data.choices[0].message.content;

        return text;
    } catch (error) {
        console.log(error);
        return "Error: Unable to fetch response from AI"
    }
  };