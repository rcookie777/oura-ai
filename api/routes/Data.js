/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const {accessToken} = req.body;
  console.log(accessToken);

  const apiUrl = "https://api.ouraring.com/v2/usercollection/personal_info";
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const personalData = response.data;

    const mappedData = {
      id: personalData.id,
      age: personalData.age,
      weight: personalData.weight,
      height: personalData.height,
      biological_sex: personalData.biological_sex,
      email: personalData.email,
    };

    res.json(mappedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error retrieving data from Oura API accessToken=" + accessToken});
  }
});

module.exports = router;
