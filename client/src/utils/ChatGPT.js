import axios from "axios";

const API_KEY = "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";

let conversationHistory = [];

export const fetchResponse = async (input, context) => {
    const contextData = JSON.stringify(context);
    const healthDataMessage = {
      role: "user",
      content: `This is my health data: ${contextData}`,
    };
    const inputMessage = {
      role: "user",
      content: `Act as an expert in health and sleep respond to this input based on my health data "${input}" and suggest another question I can ask you to learn more about my health.`,
    };
  
    // Merge the health data message with the conversation history
    const messagesToSend = [healthDataMessage, ...conversationHistory, inputMessage];

    console.log(messagesToSend);
  
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: messagesToSend,
          max_tokens: 500,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const text = response.data.choices[0].message.content;
  
      conversationHistory.push(inputMessage);
      conversationHistory.push({ role: "assistant", content: text });
  
      return text;
    } catch (error) {
      console.log("API error response: ", error.response.data);
      console.log(error);
      return "Error: Unable to fetch response from AI";
    }
  };  