// var firstBall = null;
// var secondBall = null;
// var canPick = true;
// var tempX = null;
// var tempY = null;
// var toCheck = false;
// var ballsArray = [];
// var ballsTable = [];
// var score = 0;
// var loaded = 0;
// var over = 0;
//var gameTime = 60; // время игры в секундах

// добавляем фоновую музыку
// var audio = document.createElement("audio");
// audio.src = "./media/sounds/MainTheme.mp3";
// audio.autoplay = true;
// audio.loop = true;
// audio.volume = 0.2;

// // добавляем звуки действий игрока
// var select = document.createElement("audio");
// select.src = "./media/sounds/click.wav";
// var ballIn = document.createElement("audio");
// ballIn.src = "./media/sounds/ballIn.wav";
// var ballOut = document.createElement("audio");
// ballOut.src = "./media/sounds/ballOut.wav";

// добавляем иконки включения/выклчюения звука
//var soundOffIcon = new PIXI.Sprite.fromImage("./media/images/soundOff.png");
//var soundOnIcon = new PIXI.Sprite.fromImage("./media/images/soundOn.png");

// добавляем изображение на случай окончания игры
// var gameOver = new PIXI.Sprite.fromImage("./media/images/GameOver.png");
// gameOver.width = 800;
// gameOver.position.x = 0;
// gameOver.position.y = 100;

// загружаем игру
const loader = new Loader();
loader.add("./media/sprites/sprites.json").load(onLoaded);

// добавляем очки
// var scoreText = new PIXI.Text();
// scoreText.x = 50;
// scoreText.y = 140;
// scoreText.setText("Очки: " + score);
// gameScene.addChild(scoreText);

// основная функция игры
function onLoaded() {
  if (loaded === 0) {
    // при выполнении функции onLoaded повторно (при отсутствии хода на игровой сцене) не трогаем следующие значения и функции.
    score = 0;
    //  timer(); // запускаем обратный отсчет
    soundOn(); // включаем фоновую музыку, пользователь выключит, если надо
  }
  //Выбор 25 шаров разных цветов
  randBall();
  // вывод шаров на экран:
  for (var i = 0; i < 5; i++) {
    ballsTable[i] = [];
    for (var j = 0; j < 5; j++) {
      // новый Sprite
      var ball = newBall(i, j); // создание шаров
      ballsTable[i][j] = ball; // обновляем нашу таблицу
      gameScene.addChild(ball);
      //animateAtStart(ball);
      // //console.log(ballsTable[i][j].name + " имеет индексы: " + i + " " + j);
    }
    requestAnimationFrame(animate);
  }
  // ballIn.play();
  // processArray();
  // loaded += 1;
}

// функция создания шара с координатами x и y случайного цвета
function newBall(x, y) {
  var sprite = new PIXI.Sprite.fromFrame(ballsArray[x * 5 + y]);
  sprite.name = getColor(ballsArray[x * 5 + y]); //Определяем цвет шара по спрайтшиту
  sprite.theValue = 1; // вспомогательный атрибут для удаления шаров, помеченных как 0
  sprite.position.set(360 + x * 75, 65 + y * 75);
  sprite.buttonMode = true;
  sprite.interactive = true;
  sprite.isSelected = false;
  sprite._anchor.set(0.5);
  sprite.alpha = 1;
  sprite.on("click", onButtonClick); // действие при нажатии на шар
  sprite.on("removed", fillUpVacancies); // действие при удалении шара (заполняем таблицу новыми шарами вместо удаленных)
  return sprite;
}

// // проверка строк и столбцов на наличие трех и более одноцветных шаров подряд
function checkRowsAndColumns() {
  //console.log("Запуск обработки строк...");
  toCheck = false;
  for (var j = 0; j < 5; j++) {
    var count = 0;
    var color = null;
    var index = 0;
    for (var i = 0; i < 5; i++) {
      if (ballsTable[i][j] !== null && ballsTable[i][j].name === color) {
        count += 1;
        index = i;
        if (count >= 2 && index === 4) {
          ////console.log("Есть повторяющиеся шары в конце строки");
          toCheck = true;
          for (var m = index - count; m <= index; m++) {
            if (ballsTable[m][j] !== null) {
              //console.log(ballsTable[m][j].name + " подлежит удалению. Индекс: " + m + " " + j);
              ballsTable[m][j].theValue = 0;
            }
          }
        } else {
          if (count >= 2) {
            ////console.log("Есть повторяющиеся шары в строках");
            toCheck = true;
            for (m = index - count; m <= index; m++) {
              if (ballsTable[m][j] !== null) {
                //console.log(ballsTable[m][j].name + " подлежит удалению. Индекс: " + m + " " + j);
                ballsTable[m][j].theValue = 0;
              }
            }
          }
        }
      } else {
        if (ballsTable[i][j] !== null) {
          color = ballsTable[i][j].name;
          count = 0;
        }
      }
    }
  }
  ////console.log("Обработка строк завершена!");

  ////console.log("Запуск обработки столбцов...");
  for (i = 0; i < 5; i++) {
    count = 0;
    color = null;
    index = 0;

    for (j = 0; j < 5; j++) {
      if (ballsTable[i][j] !== null && ballsTable[i][j].name === color) {
        count += 1;
        index = j;
        if (count >= 2 && index === 4) {
          ////console.log("Есть повторяющиеся шары в конце столбца");
          toCheck = true;
          for (m = index - count; m <= index; m++) {
            if (ballsTable[i][m] !== null) {
              //console.log(ballsTable[i][m].name + " подлежит удалению. Индекс: " + i + " " + m);
              ballsTable[i][m].theValue = 0;
            }
          }
        } else {
          if (count >= 2) {
            ////console.log("Есть повторяющиеся шары в столбцах");
            toCheck = true;
            for (m = index - count; m <= index; m++) {
              if (ballsTable[i][m] !== null) {
                //console.log(ballsTable[i][m].name + " подлежит удалению. Индекс: " + i + " " + m);
                ballsTable[i][m].theValue = 0;
              }
            }
          }
        }
      } else {
        if (ballsTable[i][j] !== null) {
          color = ballsTable[i][j].name;
          count = 0;
        }
      }
    }
  }
  ////console.log("Обработка столбцов завершена!");
}

// // заполнение вакансий, образованных после "сгорания" шаров
function fillUpVacancies() {
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

    function lateCheck() {
      // Callback анимации создания шара: после создания нужно проверить таблицу заново
      setTimeout(function () {
        // задержка запуска проверки. мы ждем, пока закончится анимация заполнения
        processArray();
      }, 400);
    }

    ////console.log("закончили");
    toCheck = true; // флаг, указывающий на необходимость проверки, если были созданы шары
  }, 200); // время, необходимое для завершение анимации удаления
}

// // обработчик события клика по шару
function onButtonClick() {
  if (canPick) {
    // можем ли выбрать шар
    if (!this.isSelected) {
      // шар не выбран
      this.isSelected = true; // выбираем шар
      select.play();
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
          TweenMax.to(firstBall.position, 0.1, {
            x: secondBall.position.x,
            y: secondBall.position.y,
          });
          TweenMax.to(secondBall.position, 0.1, { x: tempX, y: tempY });

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
}

// // функция обработки массива и подготовки его для совершения следующего игрового действия
function processArray() {
  checkRowsAndColumns(); // проверяем таблицу, ищем по три и более шаров подряд и помечаем их (ball.TheVal = 0)
  removeBalls(ballsTable); // удаляем отмеченные шары, которые после удаления сразу запустят функцию fillUpVacancies
  requestAnimationFrame(animate); // обновление экрана

  if (!isMovePossible(ballsTable) && !over) {
    // если ходы закончились, но игра еще продолжается, то таблица создается заново
    alert("Ходов больше нет. Чтобы продолжить нужно перемешать шары...");
    resetBalls(ballsTable); // удаляем все шары
    onLoaded(); // запускаем
  }
}

// // функция удаления шаров на основании проверки массива методом checkRowsAndColumns()
function removeBalls(arg) {
  // удаляем шары с меткой TheVal = 0
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (arg[i][j].theValue === 0) {
        ballOut.play(); // звук удаления шара

        // анимация удаления
        new TweenMax(arg[i][j].scale, 0.15, {
          x: 0.1,
          y: 0.1,
          onComplete: del,
          onCompleteParams: [arg, i, j],
        });
      }
    }
  }

  function del(arg, i, j) {
    //console.log("Удаляем ", i, j);
    gameScene.removeChild(arg[i][j]);
    arg[i][j] = null;

    // отображение +100 при сгорании шаров
    const style = {
      fontSize: 15,
      tint: "#8e0ff4",
    };
    const text = new PIXI.BitmapText("+100", style);
    text.x = i * 75 + 335;
    text.y = j * 75 + 15;
    gameScene.addChild(text);
    new TweenMax(text.style, 1, { fontSize: 20 });
    new TweenMax(text, 1, {
      alpha: 0,
      onComplete: textAnimEnd,
      onCompleteParams: [text],
    });

    // считаем очки: по 100 за шар
    score += 100;
    // //console.log(score);
  }

  //   // callback при завершении анимации удаления шара
  function textAnimEnd(arg) {
    //arg.kill();
    gameScene.removeChild(arg); // удаляем шар после завершения анимации
    scoreText.setText("Очки: " + score); // обновляем очки на экране
  }
}

// // поулчение рандомного массива спрайтов
function randBall() {
  while (ballsArray.length < 25) {
    var candidate = Math.floor(Math.random() * 5);
    ballsArray.push(candidate);
  }
}

// // проверка хода: если сгорание произойдет - ход возможен, если нет - то замена шаров невозможна
function isMoveRight(table, b1, b2) {
  // моделирование ситуации выполнения хода
  var tempBall1 = b1;
  var tempBall2 = b2;
  table[(b1.position.x - 360) / 75][(b1.position.y - 65) / 75] = tempBall2;
  table[(b2.position.x - 360) / 75][(b2.position.y - 65) / 75] = tempBall1;

  checkRowsAndColumns(table); // проводим проверку сгорания после хода
  // возвращаем все как было
  table[(b1.position.x - 360) / 75][(b1.position.y - 65) / 75] = tempBall1;
  table[(b2.position.x - 360) / 75][(b2.position.y - 65) / 75] = tempBall2;

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (table[i][j] !== null) {
        table[i][j].theValue = 1;
      }
    }
  }

  // получаем ответ на наш вопрос о сгорании после хода
  return toCheck;
}

// // проверка наличия ходов в gameScene
function isMovePossible(table) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var ball1 = table[i][j];
      var ball2 = table[i + 1][j];
      if (isMoveRight(table, ball1, ball2)) {
        //console.log("Есть ход по горизонтали");
        return true;
      }
      ball2 = table[i][j + 1];
      if (isMoveRight(table, ball1, ball2)) {
        //console.log("Есть ход по вертилкали");
        return true;
      }
    }
  }
  //console.log("Ходов больше нет");
  return false;
}

// // анимация при первой загрузке таблицы
function animateAtStart(ball) {
  ball.scale.x = 0.1;
  ball.scale.y = 0.1;
  TweenMax.to(ball, 0.3, { rotation: (360 * Math.PI) / 180 });
  TweenMax.to(ball.scale, 0.3, { x: 1, y: 1 });
}

// // функция для сопоставления цвета шаров с их номером в спрайтшите
function getColor(arr) {
  switch (arr) {
    case 0:
      return "red";
    case 1:
      return "green";
    case 2:
      return "blue";
    case 3:
      return "yellow";
    case 4:
      return "violet";
  }
}

// запрос на render
function animate() {
  requestAnimationFrame(animate);
  app.render();
}

// функция выключения звука во время игры
function soundOff() {
  select.muted = true;
  ballOut.muted = true;
  ballIn.muted = true;
  audio.muted = true;
  soundOffIcon.height = 70;
  soundOffIcon.width = 70;
  soundOffIcon._anchor.set(0.5);
  soundOffIcon.position.set(100, 250);
  soundOffIcon.buttonMode = true;
  soundOffIcon.interactive = true;
  soundOffIcon.on("click", soundOn);
  gameScene.removeChild(soundOnIcon);
  gameScene.addChild(soundOffIcon);
}

// // функция включения звука во время игры
function soundOn() {
  select.muted = false;
  ballOut.muted = false;
  ballIn.muted = false;
  audio.muted = false;
  audio.play();
  soundOnIcon.height = 70;
  soundOnIcon.width = 70;
  soundOnIcon._anchor.set(0.5);
  soundOnIcon.position.set(100, 250);
  soundOnIcon.buttonMode = true;
  soundOnIcon.interactive = true;
  soundOnIcon.on("click", soundOff);
  gameScene.removeChild(soundOffIcon);
  gameScene.addChild(soundOnIcon);
}

// // удаление старой таблицы шаров, где ход невозможен (для последующего создания новой таблицы)
function resetBalls(arg) {
  // Удаляем все шары из игровой сцены и из таблицы с анимацией
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      ballOut.play();
      new TweenMax(arg[i][j].scale, 0.05, {
        x: 0.1,
        y: 0.1,
        onComplete: del,
        onCompleteParams: [arg, i, j],
      });
    }
  }
  function del(arg, i, j) {
    gameScene.removeChild(arg[i][j]);
    arg[i][j] = null;
  }
}

// время игры
// function timer() {
//   // отображаем таймер на экране
//   var time = new PIXI.Text();
//   time.x = 50;
//   time.y = 65;
//   time.setText("Время: " + gameTime);
//   gameScene.addChild(time);

//   // обратный отсчет
//   var timerId = setInterval(function () {
//     gameScene.removeChild(time);
//     time.setText("Время: " + gameTime);
//     gameTime -= 1;
//     gameScene.addChild(time);
//     //console.log(gameTime);
//   }, 1000);

//   // через время gameTime остановить таймер
//   setTimeout(function () {
//     clearInterval(timerId); // останавливаем таймер
//     alert("Игра окончена! Ваш счет: " + score);
//     gameScene.visible = false;
//     app.stage.addChild(sceneFrame); // закрываем картинкой gameScene весь stage, тем самым скрывая игровой процесс
//     over = 1; // вспомогательное значение для
//     app.stage.addChild(gameOver); // выводим изображение GameOver

//     // добавляем текст с подсказкой
//     var newGame = new PIXI.Text("Чтобы начать новую игру обновите страницу");
//     newGame.x = 120;
//     newGame.y = 370;
//     app.stage.addChild(newGame);
//   }, (gameTime + 2) * 1000);
// }
