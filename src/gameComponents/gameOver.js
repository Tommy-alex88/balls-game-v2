import * as PIXI from "pixi.js";
import gsap from "gsap";

import { app } from "./startGame";
import startGame, { gameScene } from "./startGame";

const gameOver = () => {
  // добавляем изображение на случай окончания игры
  const gameOverTexture = app.loader.resources.gameOverImg.texture;
  let gameOverPic = new PIXI.Sprite(gameOverTexture);
  gameOverPic.width = 150;
  gameOverPic.height = 150;
  gameOverPic.anchor.set(0.5);
  gameOverPic.position.x = 215;
  gameOverPic.position.y = 220;

  gameScene.addChild(gameOverPic); // выводим изображение GameOver

  // добавляем текст с подсказкой
  const gameOverText = new PIXI.Text("Ходов больше нет!");
  gameOverText.x = 100;
  gameOverText.y = -50;
  gameScene.addChild(gameOverText);

  gsap.to(gameOverText.position, {
    duration: 1,
    x: 100,
    y: 70,
    onComplete: newGameOffer,
  });

  let newGameText = "";

  function newGameOffer() {
    newGameText = new PIXI.Text("ИГРАТЬ СНОВА");
    newGameText.buttonMode = true;
    newGameText.interactive = true;
    newGameText.x = 110;
    newGameText.y = 450;
    newGameText.on("click", newGameHandler);
    newGameText.on("tap", newGameHandler);
    gameScene.addChild(newGameText);

    gsap.to(newGameText.position, { duration: 1, x: 110, y: 340 });
  }
  function newGameHandler() {
    gsap.to(gameOverPic.position, { duration: 0.5, x: 800, onComplete: anim1 });

    function anim1() {
      gameOverPic.destroy();
      gsap.to(gameOverText.position, {
        duration: 0.5,
        x: 800,
        onComplete: anim2,
      });
    }

    function anim2() {
      gameOverText.destroy();
      gsap.to(newGameText.position, {
        duration: 0.5,
        x: 800,
        onComplete: endAnim,
      });
    }

    function endAnim() {
      newGameText.destroy();
      app.loader.load(startGame);
    }
  }
};

export default gameOver;
