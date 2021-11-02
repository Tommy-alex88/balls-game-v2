let firstBall = null;
let secondBall = null;
let canPick = true;

export const ballClickHandler = () => {
  if (canPick) {
    // можем ли выбрать шар
    if (!this.isSelected) {
      // шар не выбран
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
          //   TweenMax.to(firstBall.position, 0.1, {
          //     x: secondBall.position.x,
          //     y: secondBall.position.y,
          //   });
          //   TweenMax.to(secondBall.position, 0.1, { x: tempX, y: tempY });

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
            firstBall = null;
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
};
