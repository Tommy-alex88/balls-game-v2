import Blue from "../assets/ballsTextures/Blue.png";
import Green from "../assets/ballsTextures/Green.png";
import Red from "../assets/ballsTextures/Red.png";
import Violet from "../assets/ballsTextures/Violet.png";
import Yellow from "../assets/ballsTextures/Yellow.png";

// поулчение рандомного цвета
const randomColoredBallTexture = () => {
  const imgArr = [Blue, Green, Red, Violet, Yellow];
  const index = Math.floor(Math.random() * 5);
  const color = imgArr[index];
  return color;
};

export default randomColoredBallTexture;
