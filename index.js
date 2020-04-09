const sharp = require('sharp');
const _ = require('lodash');

const { removeBlackLines, cropBorders, splitImages } = require('./image-manipulation');

(async () => {

  const imgPath = 'images/captcha1.png';

  let { width, height, format } = await sharp(imgPath).metadata();

  const imgData = await sharp(imgPath).raw().toBuffer();

  // 3 channels RGB
  let pixels = _.chunk(imgData, 3);
  
  pixels = removeBlackLines(pixels, width);

  let images = splitImages(pixels, height, width);

  images.forEach(async (image, i) => {

    image = cropBorders(image.pixels, image.height, image.width);

    await sharp(Buffer.from(_.concat(...image.pixels)), {
      raw: {
        width: image.width,
        height: image.height,
        channels: 3
      }
    }).toFile(`output/test${i}.${format}`);
  })

})();