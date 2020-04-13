const { makePrediction } = require('./prediction');

(async () => {

  const symbol = 'chave';
  const imgPath = 'images/captcha3.png';
  const output = true;

  await makePrediction(symbol, imgPath, output);

})();