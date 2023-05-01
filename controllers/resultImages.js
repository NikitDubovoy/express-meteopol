require("dotenv").config();
const { API_KEY_GISMETEO } = process.env;
const request = require("request-promise");

const getWeather = (req, res, next) => {
  const { geolocation } = req.body;
  const option = {
    method: "GET",
    uri: `https://api.gismeteo.net/v2/weather/forecast/?latitude=${geolocation.lat}&longitude=${geolocation.lon}&days=10`,
    headers: {
      "User-Agent": "Request-Promise",
      "X-Gismeteo-Token": API_KEY_GISMETEO,
    },
    json: true,
  };
  request(option)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(err, "Ошибка"));
};

module.exports = {
  getWeather,
};
