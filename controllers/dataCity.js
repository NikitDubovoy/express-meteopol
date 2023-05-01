const DataCity = require("../models/dataCity");

const getCity = (req, res) => {
  const { nameCity } = req.body;
  if (!nameCity) {
    return res.status(400).send("Имя города не указано");
  }
  const regex = new RegExp(`^${nameCity.toLowerCase()}`, "i");
  DataCity.find({ city: regex })
    .then((cities) => {
      res.status(200).send(cities.slice(0, 5));
    })
    .catch((err) => {
      res.status(500).send("Ошибка в поиске города: " + err.message);
    });
};

module.exports = {
  getCity,
};
