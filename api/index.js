const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

const express = require("express");
const app = express();
const Data = require("./routes/Data");
const cors = require("cors");

app.use(cors({origin: true}));


app.use("/data", Data);


exports.app = functions.https.onRequest(app);
