const Vibrant = require("node-vibrant");

const setPriorityColors = (path) => {
  return new Promise((resolve, reject) => {
    Vibrant.from(path).getPalette((err, palette) => {
      if (err) {
        reject(err);
        return;
      }
      const color = palette.Vibrant.getRgb();
      const alpha = 0.04;
      const rgba = `rgba(${Math.round(color[0])}, ${Math.round(
        color[1]
      )}, ${Math.round(color[2])}, ${alpha})`;
      resolve(rgba);
    });
  });
};

module.exports = {
  setPriorityColors,
};
