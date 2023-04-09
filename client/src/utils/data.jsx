import axios from "axios";
import { AuthContext } from "./AuthContext";
import React from "react";

export const getPersonalData = async (accessToken) => {
    const dt = {accessToken: accessToken}
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}app/data`;
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
      throw new Error("Error retrieving personal data from Oura API");
    }
  };

export const getSleepData = async (accessToken,startDate,endDate) => {
    const dt = {accessToken: accessToken, startDate: startDate, endDate: endDate}
    console.log("sending data",dt)
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}app/sleep`;
    console.log('apiUrl:', apiUrl);
    try {
        const response = await axios.post(apiUrl, dt);
        const sleepData = response.data;
        console.log("sleepData",sleepData)
        return sleepData;
        } catch (error) {
        console.error(error);
        throw new Error("Error retrieving sleep data from Oura API");
        }
    };

export const getAllSleepData = async (accessToken,startDate,endDate) => {
        const dt = {accessToken: accessToken, startDate: startDate, endDate: endDate}
        console.log("sending data",dt)
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}app/sleepavg`;
        try {
            const response = await axios.post(apiUrl, dt);
            const sleepData = response.data;
            console.log("all sleep data",sleepData)
            return sleepData;
            } catch (error) {
            console.error(error);
            throw new Error("Error retrieving all sleep data from Oura API");
            }
};