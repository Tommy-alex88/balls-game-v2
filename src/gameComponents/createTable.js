import animateAtStart from "./animateAtStart";
import processArray from "./processArray";
import checkRowsAndColumns from "./checkRowsAndColumns";
import isPlayingPossible from "./isPlayingPossible";
import newBall from "./newBall";

const createTable = () => {
  const ballsTable = [];
  let isTablePrepared = false;

  while (!isTablePrepared) {
    for (let i = 0; i < 5; i++) {
      ballsTable[i] = [];
      for (let j = 0; j < 5; j++) {
        let ball = newBall(i, j, ballsTable); // создание шаров
        ballsTable[i][j] = ball; // обновляем нашу таблицу
      }
    }
    const isBallsBurned = !checkRowsAndColumns(ballsTable);
    const isNextMoveExist = isPlayingPossible(ballsTable);
    isTablePrepared = isBallsBurned && isNextMoveExist;
    console.log("подготовка таблицы");
  }
  console.log("таблица готова");
  return ballsTable;
};

export default createTable;
