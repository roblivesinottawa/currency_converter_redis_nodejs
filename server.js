const express = require("express");
const path = require("path");
const axios = require("axios");
const redis = require("redis");
const app = express();

const localhost = "127.0.0.1";
const client = redis.createClient({
  host: localhost,
  port: 6379,
});
client.on("connect", () => console.log("connected to redis!!"));
client.on("error", (err) => console.log(`Error ${err}`));

const API_URL =
  "http://data.fixer.io/api/latest?access_key=5034058652fe84ccaefce8fc584ee219";

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "views"),
  });
});

app.get("/rate/:date", (req, res) => {
  const date = req.params.date;
  const url = `${API_URL}/${date}?base=USD`;

  const countKey = `USD:${date}:count`;
  const ratesKey = `USD:${date}:rates`;

  client.incr(countKey, (err, count) => {
    client.hgetall(ratesKey, (err, rates) => {
      if (rates) return res.json({ rates, count });
    });
  });

  axios
    .get(url)
    .then((response) => {
      client.hmset(ratesKey, response.data.rates, (err, result) => {
        if (err) console.log(err);
      });
      return res.json({ count, rates: response.data.rates });
    })
    .catch((error) => res.json(error.response.data));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening at localhost${port}`));
