// поулчение рандомного цвета
const randomizeBallColor = () => {
  const imgArr = ["Blue", "Green", "Red", "Violet", "Yellow"];
  const index = Math.floor(Math.random() * 5);
  const color = imgArr[index];
  return color;
};

export default randomizeBallColor;
