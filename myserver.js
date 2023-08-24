const express = require("express");
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,X-Response-Time"
  );
  res.header("Access-Control-Expose-Headers", "X-Response-Time");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let baseURL = "https://app234.onrender.com";
let axios = require("axios");

app.post("/myserver1/url", async function (req, res) {
  try {
    let startTimestamp = performance.now();
    let body = req.body;
    console.log(body);
    if (body.method === "GET") {
      let response = await axios.get(baseURL + "/" + body.url);
      console.log(response.data);
      res.send(response.data);
    }
    if (body.method === "POST") {
      let response = await axios.post(baseURL + "/" + body.url, body.body);
      console.log([body.body]);
      res.send([body.body]);
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Invalid URL", errorCode: 401 });
  }
});
