const fs = require('fs');
const sharp = require('sharp');
const _ = require('lodash');
const { removeBlackLines, cropBorders, splitImages, getImageParams } = require('./image-manipulation');

(async () => {

  const symbol = 'chave';
  const imgPath = `output/test2.png`;

  const { width, height } = await sharp(imgPath).metadata();

  const imgData = await sharp(imgPath).raw().toBuffer();

  const pixels = _.chunk(imgData, 3);

  const params = getImageParams({width, height, pixels});

  const model = {
    [symbol]: [params]
  }

  fs.readFile('model.json', 'utf-8', function(err, data) {
    if (err) throw err
    
    if (data) {
      var arrayOfObjects = JSON.parse(data)

      if (arrayOfObjects[symbol]) {
        if (!_.some(arrayOfObjects[symbol], params)) {
          arrayOfObjects[symbol].push(params)
        }
      } else {
        arrayOfObjects[symbol] = [params]
      }
    }
  
    fs.writeFile('model.json', JSON.stringify(arrayOfObjects || model), 'utf-8', function(err) {
      if (err) throw err
      console.log('Done!')
    })
  })

})();
