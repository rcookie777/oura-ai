/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const {accessToken, startDate, endDate} = req.body;
  const apiUrl = `https://api.ouraring.com/v2/usercollection/daily_sleep?start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const personalData = response.data.data.map((item) => ({
      id: item.id,
      day: item.day,
      contributors: item.contributors,
      score: item.score,
      timestamp: item.timestamp,
    }));

    const mappedData = {
      data: personalData,
      next_token: response.data.next_token,
    };

    res.json(mappedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error retrieving data from Oura API accessToken=" + accessToken});
  }
});

module.exports = router;
