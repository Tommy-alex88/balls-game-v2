import checkRowsAndColumns from "./checkRowsAndColumns";
import isPlayingPossible from "./isPlayingPossible";
import newBall from "../newBall";

const createTable = () => {
  const ballsTable = [];
  let isTablePrepared = false;

  while (!isTablePrepared) {
    for (let i = 0; i < 5; i++) {
      ballsTable[i] = [];
      for (let j = 0; j < 5; j++) {
        let ball = newBall(i, j, ballsTable); // создание шаров
        ballsTable[i][j] = ball; // обновление таблицы
      }
    }
    const isBallsBurned = !checkRowsAndColumns(ballsTable);
    const isNextMoveExist = isPlayingPossible(ballsTable);
    isTablePrepared = isBallsBurned && isNextMoveExist;
  }
  return ballsTable;
};

export default createTable;
