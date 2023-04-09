const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

const express = require("express");
const app = express();
const Data = require("./routes/Data");
const Sleep = require("./routes/Sleep");
const SleepAvg = require("./routes/SleepAvg");
const ouraDataRouter = require('./routes/ouraDataRouter');
const cors = require("cors");

app.use(cors({origin: true}));


app.use("/data", Data);
app.use("/sleep", Sleep);
app.use("/sleepavg", SleepAvg);
app.use('/ouraDataRouter', ouraDataRouter);

exports.app = functions.https.onRequest(app);
