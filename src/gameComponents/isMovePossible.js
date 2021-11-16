import checkRowsAndColumns from "./checkRowsAndColumns";

// проверка хода: если сгорание произойдет - ход возможен, если нет - то замена шаров невозможна
const isMovePossible = (table, b1, b2) => {
  // моделирование ситуации выполнения хода
  let tempBall1 = b1;
  let tempBall2 = b2;
  table[(b1.position.x - 360) / 75][(b1.position.y - 65) / 75] = tempBall2;
  table[(b2.position.x - 360) / 75][(b2.position.y - 65) / 75] = tempBall1;

  const isPossible = checkRowsAndColumns(table); // проводим проверку сгорания после хода
  // возвращаем все как было
  table[(b1.position.x - 360) / 75][(b1.position.y - 65) / 75] = tempBall1;
  table[(b2.position.x - 360) / 75][(b2.position.y - 65) / 75] = tempBall2;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (table[i][j] !== null) {
        table[i][j].theValue = 1;
      }
    }
  }

  // получаем ответ на наш вопрос о возможности сгорания шаров после хода
  return isPossible;
};

export default isMovePossible;
