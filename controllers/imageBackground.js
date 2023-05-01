const ImageBackground = require("../models/imageBackground");
const fs = require("fs");
const { setPriorityColors } = require("../middlewares/setPriorityColors");
const path = "./midjourney";

const saveImage = (req, res, next) => {
  fs.readdir(path, (err, files) => {
    if (err) {
      res.status(500).send("Ошибка, файлов в папке не найдены: " + err.message);
      return;
    }

    const promises = files.map((img) => {
      const imgPath = path + "/" + img;
      if (img.toLowerCase().endsWith(".png")) {
        return setPriorityColors(imgPath)
          .then((priorityColor) => {
            return ImageBackground.create({
              name: img,
              priorityСolor: priorityColor,
            }).catch((err) => {
              console.error(`Ошибка при сохранении изображения ${img}: ${err}`);
              throw err;
            });
          })
          .catch((err) => {
            console.error(
              `Ошибка при определении приоритетного цвета в изображении ${img}: ${err}`
            );
            throw err;
          });
      }
    });

    Promise.all(promises)
      .then(() => {
        res.status(200).send("Изображения успешно сохранены");
      })
      .catch((err) => {
        res
          .status(500)
          .send("Ошибка при сохранении изображений: " + err.message);
      });
  });
};

const getImage = (req, res) => {
  const { text } = req.query;
  ImageBackground.findOne({ name: `${text}.png` }).then((image) => {
    if (image) {
      res.status(200).send(image);
    } else {
      res.status(404).send(`message: Изображение ${image} не найдено`);
    }
  });
};

module.exports = {
  getImage,
  saveImage,
};
