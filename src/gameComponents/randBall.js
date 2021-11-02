// поулчение рандомного массива спрайтов
export const randBall = (ballsArray) => {
  while (ballsArray.length < 25) {
    var candidate = Math.floor(Math.random() * 5);
    ballsArray.push(candidate);
  }
  return ballsArray;
};
