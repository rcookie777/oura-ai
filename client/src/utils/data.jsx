import axios from "axios";

export const getOuraData = async (accessToken, startDate, endDate) => {
  const dt = {accessToken: accessToken, startDate: startDate, endDate: endDate}
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}app/ouraDataRouter`;
  try {
    const response = await axios.post(apiUrl, dt);
    return response.data;
  }
  catch (error) {
    console.error(error);
    throw new Error("Error retrieving sleep data from Oura AI API");
  }
};