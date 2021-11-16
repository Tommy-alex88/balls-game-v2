import * as PIXI from "pixi.js";
import gsap from "gsap";

import checkRowsAndColumns from "./checkRowsAndColumns";
import isMovePossible from "./isMovePossible";
import removeBalls from "./removeBalls";
import randomColoredBallTexture from "./randomColoredBallTexture";
import { gameScene } from "../App";
import { gameSound } from "./sound";

let firstBall = null;
let secondBall = null;
let canPick = true;
let ballsTable = [];

//функция создания шара с координатами x и y случайного цвета
export const newBall = (x, y, table) => {
  if (table !== null) {
    ballsTable = table;
  }

  const randColor = randomColoredBallTexture();

  const ballTexture = PIXI.Texture.from(randColor);
  const ball = new PIXI.Sprite(ballTexture);

  ball.name = randColor; //Определяем цвет шара по спрайтшиту
  ball.theValue = 1; // вспомогательный атрибут для удаления шаров, помеченных как 0
  ball.position.set(360 + x * 75, 65 + y * 75);
  ball.buttonMode = true;
  ball.interactive = true;
  ball.isSelected = false;
  ball._anchor.set(0.5);
  ball.alpha = 1;
  ball.on("click", onButtonClick); // действие при нажатии на шар
  ball.on("removed", fillUpVacancies); // действие при удалении шара (заполняем таблицу новыми шарами вместо удаленных)

  return ball;
};

function onButtonClick() {
  gameSound.play("clickBall");

  if (canPick) {
    // можем ли выбрать шар
    if (!this.isSelected) {
      this.isSelected = true; // выбираем шар
      this.scale.x = 0.75; // меняем размер
      this.scale.y = 0.75;
      //console.log(this.position.x, this.position.y, this.name, this.theValue);

      if (firstBall == null) {
        // выбранный шар первый
        firstBall = this;
      } else {
        // выбранный шар второй
        secondBall = this;
        canPick = false; // больше двух шаров не можем выбрать здесь дальше логика по замене шаров
        // если шары рядом, то начинаем их менять местами
        if (
          ((firstBall.position.x === secondBall.position.x &&
            (firstBall.position.y === secondBall.position.y - 75 ||
              firstBall.position.y === secondBall.position.y + 75)) ||
            (firstBall.position.y === secondBall.position.y &&
              (firstBall.position.x === secondBall.position.x - 75 ||
                firstBall.position.x === secondBall.position.x + 75))) &&
          isMovePossible(ballsTable, firstBall, secondBall)
        ) {
          // проверяем корректность хода

          // меняем шары местами с помощью анимации TweenMax
          let tempX = firstBall.position.x;
          let tempY = firstBall.position.y;
          gsap.to(firstBall.position, {
            duration: 0.1,
            x: secondBall.position.x,
            y: secondBall.position.y,
          });
          gsap.to(secondBall.position, {
            duration: 0.1,
            x: tempX,
            y: tempY,
          });

          // ждем завершения анимации чтобы начать выполнение действий с шарами
          setTimeout(function () {
            firstBall.scale.x = 1; // меняем размер первого шара обратно
            firstBall.scale.y = 1;
            secondBall.scale.x = 1; // меняем размер второого шара обратно
            secondBall.scale.y = 1;
            firstBall.isSelected = false;
            secondBall.isSelected = false;

            // Обновляем таблицу новыми значениями двух шаров и уничтожаем копии
            ballsTable[(firstBall.position.x - 360) / 75][
              (firstBall.position.y - 65) / 75
            ] = firstBall;
            ballsTable[(secondBall.position.x - 360) / 75][
              (secondBall.position.y - 65) / 75
            ] = secondBall;
            //firstBall.destroy();
            firstBall = null;
            //secondBall.destroy();
            secondBall = null;
            canPick = true;
            ////console.log("шары поменял местами");
            processArray(ballsTable);
          }, 150);
        } else {
          // если шары не рядом, то возвращаем все как было или ход невозможен
          //console.log("Ход невозможен или не приводит к сгоранию шаров");
          setTimeout(function () {
            firstBall.isSelected = false;
            secondBall.isSelected = false;
            firstBall.scale.x = 1; // меняем размер первого шара обратно
            firstBall.scale.y = 1;
            secondBall.scale.x = 1; // меняем размер второого шара обратно
            secondBall.scale.y = 1;
            firstBall = null;
            secondBall = null;
            canPick = true;
          }, 300);
        }
      }
    } else {
      this.scale.x = 1; // меняем размер обратно, если шар уже выбран
      this.scale.y = 1;
      this.isSelected = false; // отмена выбора
      firstBall = null;
    }
  }
}

//заполнение вакансий, образованных после "сгорания" шаров
function fillUpVacancies() {
  // вместо таймаута вставить анимацию заполнения
  setTimeout(function () {
    // Здесь мы ждем, пока пройдет анимация удаления
    //console.log("Заполняем вакансии...");
    for (let i = 0; i < 5; i++) {
      let toCreate = 0;
      ////console.log("В процессе столбец: " + i);
      for (let j = 4; j >= 0; j--) {
        if (
          j !== 0 &&
          ballsTable[i][j] === null &&
          ballsTable[i][j - 1] === null
        ) {
          //console.log("Обрабатываемый индекс: " + j + ". Нет шара ни здесь, ни сверху");
          toCreate++;
        } else if (
          j !== 0 &&
          ballsTable[i][j] === null &&
          ballsTable[i][j - 1] !== null
        ) {
          //console.log("Обрабатываемый индекс: " + j + ". Нет шара здесь, зато есть сверху");

          new gsap.to(ballsTable[i][j - 1].position, {
            duration: 0.3, // анимация перемещения шара вниз
            x: 360 + 75 * i,
            y: 65 + 75 * (j + toCreate),
          });
          // //console.log("Обновляем массив", i, j);
          ballsTable[i][j + toCreate] = ballsTable[i][j - 1]; // обновляем наш массив
          ballsTable[i][j - 1] = null; // обнуляем в нашем массиве верхний шар таблицы !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        // если нет самого верхнего шара в таблице
        else if (j === 0 && ballsTable[i][j] === null) {
          // //console.log("Обрабатываемый индекс: " + j + ". Нет шара в верху таблицы");

          //let ballsArray = [];

          for (let c = 0; c <= toCreate; c++) {
            // создаем шары в количестве toCreate
            let ball = newBall(i, c, null);
            ball.scale.x = 0.75;
            ball.scale.y = 0.75;

            new gsap.to(ball.scale, {
              duration: 0.2,
              x: 1,
              y: 1,
              onComplete: lateCheck,
            }); // анимация длится 200 мс
            gameScene.addChild(ball);
            //ballIn.play();
            ballsTable[i][c] = ball; // обновляем нашу таблицу

            //console.log(ballsTable[i][c].name + " " + i + " " + c + " создан");
          }
        }
      }
      ////console.log("Обработан столбец: " + i);
    }
    //processArray(ballsTable);

    function lateCheck() {
      // Callback анимации создания шара: после создания нужно проверить таблицу заново
      setTimeout(() => {
        // задержка запуска проверки. мы ждем, пока закончится анимация заполнения
        processArray(ballsTable);
      }, 400);
    }

    ////console.log("закончили");
    let toCheck = true; // флаг, указывающий на необходимость проверки, если были созданы шары
  }, 200); // время, необходимое для завершение анимации удаления
}
export function processArray(table) {
  checkRowsAndColumns(table); // проверяем таблицу, ищем по три и более шаров подряд и помечаем их (ball.TheVal = 0)
  removeBalls(table); // удаляем отмеченные шары, которые после удаления сразу запустят функцию fillUpVacancies
  //requestAnimationFrame(animate); // обновление экрана
}
