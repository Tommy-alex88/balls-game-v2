import * as PIXI from "pixi.js";
import gsap from "gsap";
import { sound } from "@pixi/sound";

import { gameScene } from "../App";
// import ballOutSound from "../media/sounds/ballOut.mp3";
import { gameSound } from "./sound";

// // функция удаления шаров на основании проверки массива методом checkRowsAndColumns()
const removeBalls = (balls) => {
  let score = 0;
  // удаляем шары с меткой TheVal = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (balls[i][j].theValue === 0) {
        //анимация удаления
        new gsap.to(balls[i][j].scale, {
          duration: 0.15,
          x: 0.1,
          y: 0.1,
          onComplete: del,
          onCompleteParams: [balls, i, j],
        });
      }
    }
  }

  function del(balls, i, j) {
    gameSound.play("ballOut");
    //console.log("Удаляем ", i, j);
    gameScene.removeChild(balls[i][j]);
    balls[i][j] = null;

    // отображение +100 при сгорании шаров
    const style = {
      fontSize: 15,
      tint: "#8e0ff4",
    };
    const text = new PIXI.Text("+100", style);
    text.x = i * 75 + 335;
    text.y = j * 75 + 15;
    gameScene.addChild(text);
    //new gsap(text.style, 1, { fontSize: 20 });
    new gsap.to(text, {
      duration: 1,
      alpha: 0,
      onComplete: textAnimEnd,
      onCompleteParams: [text],
    });

    // считаем очки: по 100 за шар
    score += 100;
    // console.log(score);
  }

  // callback при завершении анимации удаления шара
  function textAnimEnd(text) {
    gameScene.removeChild(text); // удаляем текст после завершения анимации
    text.destroy();
    //scoreText.setText("Очки: " + score); // обновляем очки на экране
  }
};

export default removeBalls;
