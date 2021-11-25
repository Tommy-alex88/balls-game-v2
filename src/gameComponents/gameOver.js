import * as PIXI from "pixi.js";
import gsap from "gsap";

import { gameScene } from "./startGame";
import gameOverTexture from "../assets/images/GameOver.png";

const gameOver = () => {
  // добавляем изображение на случай окончания игры
  let gameOverPic = new PIXI.Sprite(PIXI.Texture.from(gameOverTexture));
  gameOverPic.width = 800;
  gameOverPic.position.x = 0;
  gameOverPic.position.y = 100;
  //     clearInterval(timerId); // останавливаем таймер
  //     alert("Игра окончена! Ваш счет: " + score);
  //gameScene.visible = false;
  //app.stage.addChild(sceneFrame); // закрываем картинкой gameScene весь stage, тем самым скрывая игровой процесс
  //     over = 1; // вспомогательное значение для
  gameScene.addChild(gameOverPic); // выводим изображение GameOver

  // добавляем текст с подсказкой
  const gameOverText = new PIXI.Text("Ходов больше нет!");
  gameOverText.x = 250;
  gameOverText.y = -50;
  gameScene.addChild(gameOverText);

  gsap.to(gameOverText.position, {
    duration: 1,
    x: 250,
    y: 70,
    onComplete: newGameOffer,
  });

  function newGameOffer() {
    const newGame = new PIXI.Text("Чтобы начать новую игру обновите страницу");
    newGame.x = 120;
    newGame.y = 450;
    gameScene.addChild(newGame);

    gsap.to(newGame.position, { duration: 1, x: 120, y: 370 });
  }
};

export default gameOver;
