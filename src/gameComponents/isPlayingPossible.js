import isMovePossible from "./isMovePossible";

// проверка наличия ходов в gameScene
const isPlayingPossible = (table) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let ball1 = table[i][j];
      let ball2 = table[i + 1][j];
      if (isMovePossible(table, ball1, ball2)) {
        return true; //Есть ход по горизонтали
      }
      ball2 = table[i][j + 1];
      if (isMovePossible(table, ball1, ball2)) {
        return true; //Есть ход по вертилкали
      }
    }
  }
  console.log("ходов нет");
  return false; //Ходов больше нет
};

export default isPlayingPossible;
