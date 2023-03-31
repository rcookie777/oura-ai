/* eslint-disable indent */
/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable max-len */
const express = require("express");
const fetch = require("node-fetch");
const querystring = require("querystring");

const router = express.Router();

// CORS middleware to allow cross-origin requests
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


// Middleware to handle OAuth2 authorization
function authorize(req, res, next) {
    // Check if the user is already authenticated
      // Generate a random string for the state parameter
      // If not authenticated, redirect to the authorization URL
      const authorizationUrl = `https://cloud.ouraring.com/oauth/authorize?client_id=XYNUJQWZMUWS4PLE&state=XXX&redirect_uri=https%3A%2F%2Foura-ai.web.app%2F&response_type=token`;
      console.log("Made it to the authorizationUrl");
      res.redirect(authorizationUrl);
  }

// Callback route to handle the OAuth2 callback
router.get("/callback", async (req, res) => {
  const {code, state} = req.query;
  // Verify the state parameter to prevent CSRF attacks
  if (state !== req.session.state) {
    res.status(403).send("Invalid state parameter");
    return;
  }

  // Exchange the authorization code for an access token
  const params = querystring.stringify({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  });
  const tokenUrl = "https://cloud.ouraring.com/oauth/token";
  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const tokenData = await tokenResponse.json();

  // Save the access token in the session and mark the user as authenticated
  req.session.accessToken = tokenData.access_token;
  req.session.authenticated = true;

  // Redirect to the data endpoint
  res.redirect("/OuraAuth/data");
});

// Data endpoint
router.get("/data", authorize, async (req, res) => {
  // Make requests to the Oura API using the access token in req.session.accessToken
  console.log("Made it to the data endpoint");
  const apiUrl = "https://api.ouraring.com/v2/usercollection/personal_info";
  try {
    const apiResponse = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${req.session.accessToken}`,
      },
    });
    const readinessData = await apiResponse.json();
    console.log(readinessData);
    res.json(readinessData);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error retrieving data from Oura API"});
  }
});


module.exports = router;
