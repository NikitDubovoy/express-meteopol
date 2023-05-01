const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");
const { getImage } = require("./controllers/imageBackground");
const { getWeather } = require("./controllers/resultImages");
const { getCity } = require("./controllers/dataCity");
const { saveImage } = require("./controllers/imageBackground");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/mateopoldb", {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true,
    useUnifiedTopology: true,
  })
);

const ROUTES = {
  GET_IMAGE: "/getImage",
  GET_WEATHER: "/getWeather",
  GET_CITY: "/getCity",
  SAVE_IMAGE: "/saveImage",
};

app.get(ROUTES.GET_IMAGE, getImage);
app.post(ROUTES.GET_WEATHER, express.json(), getWeather);
app.post(ROUTES.GET_CITY, express.json(), getCity);
app.get(ROUTES.SAVE_IMAGE, express.json(), saveImage);
app.use((req, res, next) => {
  const error = new Error("Страница не найдена");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

app.listen(PORT, () => {});
