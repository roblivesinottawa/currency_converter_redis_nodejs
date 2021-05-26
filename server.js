const express = require("express");
const path = require("path");
const axios = require("axios");
const redis = require("redis");
const app = express();

const API_URL = "http://api.fixer.io";

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "views"),
  });
});

app.get("/rate/:date", (req, res) => {
  const date = req.params.date;
  const url = `${API_URL}/${date}?base=USD`;

  axios
    .get(url)
    .then((res) => {
      return res.json({ rates: res.date.rates });
    })
    .catch((error) => console.log(console.log(error)));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening at localhost${port}`));
