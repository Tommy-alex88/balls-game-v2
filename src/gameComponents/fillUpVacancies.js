import gsap from "gsap";

import { gameScene } from "./startGame";
import { gameSound } from "./sound";
import newBall from "./newBall";
import processArray from "./processArray";
import resetTable from "./resetTable";
import isPlayingPossible from "./isPlayingPossible";

//заполнение вакансий, образованных после "сгорания" шаров
const fillUpVacancies = (ballsTable) => {
  const fillAnimation = new Promise((resolve) => {
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
            x: 360 + 75 * i,
            y: 65 + 75 * (j + toCreate),
            onComplete: updateTable(),
          });
          function updateTable() {
            ballsTable[i][j + toCreate] = ballsTable[i][j - 1]; // обновляем наш массив
            ballsTable[i][j - 1] = null; // обнуляем в нашем массиве верхний шар таблицы !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          }
        }
        // если нет самого верхнего шара в таблице
        else if (j === 0 && ballsTable[i][j] === null) {
          // //console.log("Обрабатываемый индекс: " + j + ". Нет шара в верху таблицы");

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
              console.log(c + "  " + toCreate);
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
    console.log(" сейчас будет проверка на возможность хода");
    if (!isPlayingPossible(ballsTable)) {
      resetTable(ballsTable);
    }
  });
};

export default fillUpVacancies;
