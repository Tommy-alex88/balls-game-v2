import * as PIXI from "pixi.js";
import gsap from "gsap";
import { checkRowsAndColumns } from "./checkRowsAndColumns";

import Blue from "../media/ballsTextures/Blue.png";
import Green from "../media/ballsTextures/Green.png";
import Red from "../media/ballsTextures/Red.png";
import Violet from "../media/ballsTextures/Violet.png";
import Yellow from "../media/ballsTextures/Yellow.png";

let firstBall = null;
let secondBall = null;
let canPick = true;

//функция создания шара с координатами x и y случайного цвета
export const newBall = (x, y) => {
  const imgArr = [Blue, Green, Red, Violet, Yellow];

  const randIndex = Math.floor(Math.random() * 5);
  const randColor = imgArr[randIndex];

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
  // sprite.on("removed", fillUpVacancies); // действие при удалении шара (заполняем таблицу новыми шарами вместо удаленных)

  return ball;
};

function onButtonClick() {
  if (canPick) {
    // можем ли выбрать шар
    if (!this.isSelected) {
      this.isSelected = true; // выбираем шар
      //select.play();
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
          isMoveRight(ballsTable, firstBall, secondBall)
        ) {
          // проверяем корректность хода

          // меняем шары местами с помощью анимации TweenMax
          tempX = firstBall.position.x;
          tempY = firstBall.position.y;
          gsap.to(firstBall.position, {
            duration: 0.1,
            x: secondBall.position.x,
            y: secondBall.position.y,
          });
          gsap.to(secondBall.position, { duration: 0.1, x: tempX, y: tempY });

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
            firstBall.destroy();
            firstBall = null;
            secondBall.destroy();
            secondBall = null;
            canPick = true;
            ////console.log("шары поменял местами");
            processArray();
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
function processArray() {
  checkRowsAndColumns(ballsTable); // проверяем таблицу, ищем по три и более шаров подряд и помечаем их (ball.TheVal = 0)
  removeBalls(ballsTable); // удаляем отмеченные шары, которые после удаления сразу запустят функцию fillUpVacancies
  requestAnimationFrame(animate); // обновление экрана
}
