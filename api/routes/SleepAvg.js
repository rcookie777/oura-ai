/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const { fetchSleepData } = require("./ouraHelpers");
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { accessToken, startDate, endDate } = req.body;

  try {
    const sleepData = await fetchSleepData(accessToken, startDate, endDate);
    res.json(sleepData);
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Unknown error';
    res.status(500).json({
      message: `Error retrieving sleep average data from Oura API. accessToken=${accessToken} Error: ${errorMessage}`,
    });
  }
});

module.exports = router;
