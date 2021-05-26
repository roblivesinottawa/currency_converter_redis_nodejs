const express = require("express");
const path = require("path");
const axios = require("axios");
const redis = require("redis");
const fixer = require("fixer-api");
const app = express();

const API_URL =
  "http://data.fixer.io/api/latest?access_key=5034058652fe84ccaefce8fc584ee219";
// fixer.set({ accessKey: "5034058652fe84ccaefce8fc584ee219" });

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
    .then((response) => {
      return res.json({ rates: response.data.rates });
    })
    .catch((error) => console.log(console.log(error)));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening at localhost${port}`));
