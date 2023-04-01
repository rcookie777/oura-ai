import axios from "axios";

const API_KEY = "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";

export const fetchResponse = async (input, context) => {
    const contextData = JSON.stringify(context);
    const gptPrompt = `As Oura Ai respond to this question "${input}" given the following data as context ${contextData}. Respond back in this format "Oura Ai: You should sleep more and eat less. Important: Only provide the response in the format "Oura Ai: "`;
    console.log(gptPrompt)
    try{
        const response = await axios.post(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
            prompt: gptPrompt,
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

        // console.log("OPENAI",response);


        const text = response.data.choices[0].text;

        // Add a delay of 1 second before returning the response
        await new Promise(resolve => setTimeout(resolve, 1000));

        return text;
    } catch (error) {
        console.log(error);
        return "Error: Unable to fetch response from AI"
    }
  };






//   const contextData = JSON.stringify(data);
//   const gptPrompt = `As Oura Ai respond to this question "${input}" given the following data as context ${contextData}. Respond back in this format "Oura Ai: You should sleep more and eat less. Important: Only provide the response in the format "Oura Ai: " and keep the response less than 30 words."`;

