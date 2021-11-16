import Blue from "../media/ballsTextures/Blue.png";
import Green from "../media/ballsTextures/Green.png";
import Red from "../media/ballsTextures/Red.png";
import Violet from "../media/ballsTextures/Violet.png";
import Yellow from "../media/ballsTextures/Yellow.png";

// поулчение рандомного цвета
const randomColoredBallTexture = () => {
  const imgArr = [Blue, Green, Red, Violet, Yellow];
  const index = Math.floor(Math.random() * 5);
  const color = imgArr[index];
  return color;
};

export default randomColoredBallTexture;
