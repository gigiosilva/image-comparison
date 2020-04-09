const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

(async () => {

  const path = `images/rabbit.jpg`;

  const imageBuffer = fs.readFileSync(path);

  const tfimage = tfnode.node.decodeImage(imageBuffer);

  // Load the model.
  const mobilenetModel = await mobilenet.load();
  // Classify the image.
  const predictions = await mobilenetModel.classify(tfimage);
  
  console.log('Classification Results:', predictions);
})();
