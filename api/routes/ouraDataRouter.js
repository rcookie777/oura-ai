/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const { FORMAT, fetchSleepData, fetchActivityData, fetchHeartRateData } = require("./ouraHelpers");
router.use(bodyParser.json());

// Modified function to include additional API calls
async function fetchAndCombineData(accessToken, startDate, endDate) {
  const apiUrls = [
    `https://api.ouraring.com/v2/usercollection/personal_info`,
    `https://api.ouraring.com/v2/usercollection/daily_readiness?start_date=${startDate}&end_date=${endDate}`,
    `https://api.ouraring.com/v2/usercollection/session?start_date=${startDate}&end_date=${endDate}`,
    `https://api.ouraring.com/v2/usercollection/workout?start_date=${startDate}&end_date=${endDate}`,
  ];

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // Use Promise.all to fetch data from all APIs in parallel
  const responses = await Promise.all(
    apiUrls.map(url => axios.get(url, { headers }).catch(err => err))
  );

  const sleepDataResponse = await fetchSleepData(accessToken, startDate, endDate);
  const activityDataResponse = await fetchActivityData(accessToken, startDate, endDate);
  const heartRateResponse = await fetchHeartRateData(accessToken, startDate, endDate);

  const data = {};

  // Add an array of names for the data keys
  const dataKeys = [
    'personal_info',
    'daily_readiness',
    'session',
    'workout'
  ];

  // Check for errors and map the responses to the data object
  responses.forEach((response, index) => {
    if (response instanceof Error) {
      console.error(`Error fetching data from URL: ${apiUrls[index]}, Error: ${response.message}`);
      data[`${dataKeys[index]}_error`] = response.message;
    } else {
      data[dataKeys[index]] = response.data;
    }
  });
  
  data.sleep = sleepDataResponse;
  data.daily_activity = activityDataResponse;
  data.heart_rate = heartRateResponse;

  return data;
}

router.post("/", async (req, res) => {
  const { accessToken, startDate, endDate } = req.body;

  try {
    const data = await fetchAndCombineData(accessToken, startDate, endDate);
    res.json(data);
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Unknown error';
    res.status(500).json({
      message: `Error retrieving data from Oura API. accessToken=${accessToken} Error: ${errorMessage}`,
    });
  }
});

module.exports = router;
