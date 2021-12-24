import * as PIXI from "pixi.js";
import gsap from "gsap";

import { app } from "./startGame";
import { gameSound } from "./sound";
import isMovePossible from "./utils/isMovePossible";
import processArray from "./utils/processArray";
import randomizeBallColor from "./utils/randomizeBallColor";
import store from "../store";

let firstBall = null;
let secondBall = null;
let canPick = true;
let ballsTable = [];
const padding = 65;

//функция создания шара с координатами x и y случайного цвета
const newBall = (x, y, table) => {
  if (table !== null) {
    ballsTable = table;
  }
  const randColor = randomizeBallColor();
  const sheet = app.loader.resources.spriteSheet.textures[`${randColor}.png`];
  const ball = new PIXI.Sprite(sheet);
  ball.name = randColor; //Определяем цвет шара по спрайтшиту
  ball.theValue = 1; // вспомогательный атрибут для удаления шаров, помеченных как 0
  ball.position.set(padding + x * 75, padding + y * 75);
  ball.buttonMode = true;
  ball.interactive = true;
  ball.isSelected = false;
  ball._anchor.set(0.5);
  ball.alpha = 1;
  ball.on("click", onButtonClick);
  ball.on("tap", onButtonClick); // действие при нажатии на шар

  return ball;
};

function onButtonClick() {
  const state = store.getState();
  if (state.isInteractive) {
    // можем кликнуть по шару, только если анимация заполнения завершена
    gameSound.play("clickSound");
    if (canPick) {
      // можем ли выбрать шар
      if (!this.isSelected) {
        this.isSelected = true; // выбираем шар
        this.scale.x = 0.75; // меняем размер
        this.scale.y = 0.75;

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

            // меняем шары местами с помощью анимации
            let tempX = firstBall.position.x;
            let tempY = firstBall.position.y;

            gsap.to(firstBall.position, {
              duration: 0.3,
              x: secondBall.position.x,
              y: secondBall.position.y,
            });

            gsap.to(secondBall.position, {
              duration: 0.3,
              x: tempX,
              y: tempY,
              onComplete: returnBallsScale,
            });

            // ждем завершения анимации чтобы начать выполнение действий с шарами
            function returnBallsScale() {
              firstBall.scale.x = 1; // меняем размер первого шара обратно
              firstBall.scale.y = 1;
              secondBall.scale.x = 1; // меняем размер второого шара обратно
              secondBall.scale.y = 1;
              firstBall.isSelected = false;
              secondBall.isSelected = false;

              // Обновляем таблицу новыми значениями двух шаров и уничтожаем копии
              ballsTable[(firstBall.position.x - padding) / 75][
                (firstBall.position.y - padding) / 75
              ] = firstBall;
              ballsTable[(secondBall.position.x - padding) / 75][
                (secondBall.position.y - padding) / 75
              ] = secondBall;
              firstBall = null;
              secondBall = null;
              canPick = true;
              processArray(ballsTable);
            }
          } else {
            // если шары не рядом или ход невозможен, то возвращаем все как было
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
}

export default newBall;
