import * as TweenMax from "gsap";

//заполнение вакансий, образованных после "сгорания" шаров
export function fillUpVacancies() {
  // вместо таймаута вставить анимацию заполнения
  setTimeout(function () {
    // Здесь мы ждем, пока пройдет анимация удаления
    //console.log("Заполняем вакансии...");
    for (var i = 0; i < 5; i++) {
      var toCreate = 0;
      ////console.log("В процессе столбец: " + i);
      for (var j = 4; j >= 0; j--) {
        if (
          j !== 0 &&
          ballsTable[i][j] === null &&
          ballsTable[i][j - 1] === null
        ) {
          // //console.log("Обрабатываемый индекс: " + j + ". Нет шара ни здесь, ни сверху");
          toCreate++;
        } else if (
          j !== 0 &&
          ballsTable[i][j] === null &&
          ballsTable[i][j - 1] !== null
        ) {
          // //console.log("Обрабатываемый индекс: " + j + ". Нет шара здесь, зато есть сверху");

          new TweenMax(ballsTable[i][j - 1].position, 0.3, {
            // анимация перемещения шара вниз
            x: 360 + 75 * i,
            y: 65 + 75 * (j + toCreate),
          });
          // //console.log("Обновляем массив", i, j);
          ballsTable[i][j + toCreate] = ballsTable[i][j - 1]; // обновляем наш массив
          ballsTable[i][j - 1] = null; // обнуляем в нашем массиве верхний шар таблицы
        }
        // если нет самого верхнего шара в таблице
        else if (j === 0 && ballsTable[i][j] === null) {
          // //console.log("Обрабатываемый индекс: " + j + ". Нет шара в верху таблицы");

          ballsArray = [];
          randBall();

          for (var c = 0; c <= toCreate; c++) {
            // создаем шары в количестве toCreate
            var ball = newBall(i, c);
            ball.scale.x = 0.75;
            ball.scale.y = 0.75;
            new TweenMax(ball.scale, 0.2, {
              x: 1,
              y: 1,
              onComplete: lateCheck,
            }); // анимация длится 200 мс
            gameScene.addChild(ball);
            ballIn.play();
            ballsTable[i][c] = ball; // обновляем нашу таблицу

            //console.log(ballsTable[i][c].name + " " + i + " " + c + " создан");
          }
        }
      }
      ////console.log("Обработан столбец: " + i);
    }

    const lateCheck = () => {
      // Callback анимации создания шара: после создания нужно проверить таблицу заново
      setTimeout(() => {
        // задержка запуска проверки. мы ждем, пока закончится анимация заполнения
        processArray();
      }, 400);
    };

    ////console.log("закончили");
    toCheck = true; // флаг, указывающий на необходимость проверки, если были созданы шары
  }, 200); // время, необходимое для завершение анимации удаления
}
