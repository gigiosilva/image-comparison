const getPixels = require('get-pixels');
const fs = require('fs');
const sharp = require('sharp');
const _ = require('lodash');

(async () => {

  getPixels(`images/captcha1.png`, function(err, pixels){
    if (err){
      console.log(err);
      return;
    } else {
      
      let points = _.chunk(pixels.data, 4);
      let width = pixels.shape[0];
      let height = pixels.shape[1];
      let channels = pixels.shape[2];

      console.log(pixels.data.length)
      console.log(points.length)

      points = points.map((point, i) => {
        if ((point[0] == 0 && point[1] == 0 && point[2] == 0) && i > width) {
          let aboveLine = i-width;
          let belowLine = i+width;

          return [
           (points[aboveLine][0] + points[belowLine][0]) / 2,
           (points[aboveLine][1] + points[belowLine][1]) / 2, 
           (points[aboveLine][2] + points[belowLine][2]) / 2, 
           (points[aboveLine][3] + points[belowLine][3]) / 2
          ]
        }

        return point;
      });
      
      sharp(Buffer.from(_.concat(...points)), {
        raw: {
          width: width,
          height: height,
          channels: channels
        }
      }).toFile('test1.png');
    }
  });

})();