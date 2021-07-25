const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = require("./routes");
const platform = require("./platform");;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", apiRouter);
app.listen(platform.port, () => {
  console.log(`Listening to port ${platform.port}..`);
})