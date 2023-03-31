const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const OuraAuth = require("./routes/OuraAuth");
app.use("/OuraAuth", OuraAuth);

exports.app = functions.https.onRequest(app);
