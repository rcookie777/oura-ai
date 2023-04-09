/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

const FORMAT = "Date, Awake Time (s), Sleep Efficiency (%), Bedtime Start, Bedtime End, Time in Bed (s), Total Sleep Duration (s), Deep Sleep Duration (s), Light Sleep Duration (s), REM Sleep Duration (s), Restless Periods, Average Heart Rate, Lowest Heart Rate, Average Breath";

function convertData(originalData) {
  return originalData.map(entry => {
    return {
      date: entry.summary_date.substr(0,10),
      awake_time: entry.awake,
      efficiency: entry.efficiency,
      bedtime_start: entry.bedtime_start,
      bedtime_end: entry.bedtime_end,
      time_in_bed: entry.total,
      total_sleep_duration: entry.duration,
      deep_sleep_duration: entry.deep,
      light_sleep_duration: entry.light,
      rem_sleep_duration: entry.rem,
      restless_periods: entry.restless,
      average_heart_rate: entry.hr_average,
      lowest_heart_rate: entry.hr_lowest,
      average_breath: entry.breath_average,
    };
  });
}

router.post("/", async (req, res) => {
  const { accessToken, startDate, endDate } = req.body;
  const apiUrl = `https://api.ouraring.com/v1/sleep?start=${startDate}&end=${endDate}`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const sleepData = response.data.sleep || [];
    const reducedData = convertData(sleepData);
    res.json({
      format: FORMAT,
      data: reducedData
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Unknown error';
    res.status(500).json({
      message: `Error retrieving sleep average data from Oura API. accessToken=${accessToken} Error: ${errorMessage}`,
    });
  }
});

module.exports = router;
