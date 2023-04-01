import axios from "axios";
import { AuthContext } from "./AuthContext";
import React from "react";

// const getAccessToken = () => {
//   console.log("accessToken", accessToken);
//   return accessToken;
// };

export const getPersonalData = async (accessToken) => {
    const Token = accessToken
    console.log("Token in getPersonalData",Token)
    const requestData = { Token };

    const dt = {accessToken: Token}
    console.log("sending data",dt)
    const apiUrl = "https://us-central1-oura-ai.cloudfunctions.net/app/data";
    try {
      const response = await axios.post(apiUrl, dt);
      const personalData = response.data;
      const mappedData = {
        id: personalData.id,
        age: personalData.age,
        weight: personalData.weight,
        height: personalData.height,
        biological_sex: personalData.biological_sex,
        email: personalData.email,
      };
      return mappedData;
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving data from Oura API");
    }
  };
  

export const getSleepData = async (accessToken,startDate,endDate) => {
    const Token = accessToken
    console.log("Token in getPersonalData",Token)
    const requestData = { Token };
    const dt = {accessToken: Token, startDate: startDate, endDate: endDate}
    console.log("sending data",dt)
    const apiUrl = "https://us-central1-oura-ai.cloudfunctions.net/app/sleep";
    try {
        const response = await axios.post(apiUrl, dt);
        const sleepData = response.data;
        console.log("sleepData",sleepData)
        return sleepData;
        } catch (error) {
        console.error(error);
        throw new Error("Error retrieving data from Oura API");
        }
    };

export const getAllSleepData = async (accessToken,startDate,endDate) => {
        const Token = accessToken
        console.log("Token in getPersonalData",Token)
        const requestData = { Token };
        const dt = {accessToken: Token, startDate: startDate, endDate: endDate}
        console.log("sending data",dt)
        const apiUrl = "https://us-central1-oura-ai.cloudfunctions.net/app/sleepavg";
        try {
            const response = await axios.post(apiUrl, dt);
            const sleepData = response.data;
            console.log("sleepData",sleepData)
            return sleepData;
            } catch (error) {
            console.error(error);
            throw new Error("Error retrieving data from Oura API");
            }
};


    
