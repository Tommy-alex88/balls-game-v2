import gsap from "gsap";

import { gameScene } from "./startGame";
import { gameSound } from "./sound";
import newBall from "./newBall";
import processArray from "./utils/processArray";
import resetTable from "./utils/resetTable";
import isPlayingPossible from "./utils/isPlayingPossible";
import store from "../store";

const padding = 65;

//заполнение вакансий, образованных после "сгорания" шаров
const fillUpVacancies = (ballsTable) => {
  const fillAnimation = new Promise((resolve) => {
    //store.dispatch({ type: "TOGGLE_INTERACTABILITY", payload: false });
    for (let i = 0; i < 5; i++) {
      let toCreate = 0;
      for (let j = 4; j >= 0; j--) {
        if (
          j !== 0 &&
          ballsTable[i][j] === null &&
          ballsTable[i][j - 1] === null
        ) {
          toCreate++;
        } else if (
          j !== 0 &&
          ballsTable[i][j] === null &&
          ballsTable[i][j - 1] !== null
        ) {
          new gsap.to(ballsTable[i][j - 1].position, {
            duration: 0.5, // анимация перемещения шара вниз
            x: padding + 75 * i,
            y: padding + 75 * (j + toCreate),
            onComplete: updateTable(),
          });
          function updateTable() {
            ballsTable[i][j + toCreate] = ballsTable[i][j - 1]; // обновляем наш массив
            ballsTable[i][j - 1] = null; // обнуляем в нашем массиве верхний шар таблицы !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          }
        }
        // если нет самого верхнего шара в таблице
        else if (j === 0 && ballsTable[i][j] === null) {
          for (let c = 0; c <= toCreate; c++) {
            // создаем шары в количестве toCreate
            let ball = newBall(i, c, null);
            ball.scale.x = 0.75;
            ball.scale.y = 0.75;
            new gsap.to(ball.scale, {
              duration: 0.25,
              x: 1,
              y: 1,
              onComplete: complete,
            });
            gameScene.addChild(ball);
            ballsTable[i][c] = ball; // обновляем нашу таблицу
            function complete() {
              if (c === toCreate) {
                resolve();
              }
            }
          }
        }
      }
    }
  });

  fillAnimation.then(() => {
    gameSound.play("ballIn");
    processArray(ballsTable);
    if (!isPlayingPossible(ballsTable)) {
      resetTable(ballsTable);
    }
    store.dispatch({ type: "TOGGLE_INTERACTABILITY", payload: true });
  });
};

export default fillUpVacancies;
