import * as PIXI from "pixi.js";
import gsap from "gsap";

import { gameScene } from "./startGame";
import fillUpVacancies from "./fillUpVacancies";
import store from "../store";

const padding = 65;
// // функция удаления шаров на основании проверки массива методом checkRowsAndColumns()
const removeBalls = (balls) => {
  store.dispatch({ type: "TOGGLE_INTERACTABILITY", payload: false });
  let score = 100;
  const removeAnimPromise = new Promise((resolve) => {
    // удаляем шары с меткой TheVal = 0
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (balls[i][j].theValue === 0) {
          //анимация удаления
          new gsap.to(balls[i][j].scale, {
            duration: 0.3,
            x: 0,
            y: 0,
            onComplete: del,
            onCompleteParams: [balls, i, j],
          });
        }
      }
    }
    setTimeout(() => {
      resolve();
    }, 400);

    function del(balls, i, j) {
      store.dispatch({ type: "UPDATE_SCORE", payload: score });
      gameScene.removeChild(balls[i][j]);
      balls[i][j] = null;

      // отображение +100 при сгорании шаров
      const style = {
        fontSize: 15,
        tint: "#8e0ff4",
      };
      const text = new PIXI.Text("+100", style);
      text.x = i * 75 + padding - 25;
      text.y = j * 75 + padding - 50;
      gameScene.addChild(text);
      new gsap.to(text, {
        duration: 1.5,
        alpha: 0,
        onComplete: textAnimEnd,
        onCompleteParams: [text],
      });
      // считаем очки: по 100 за шар
    }

    // callback при завершении анимации удаления шара
    function textAnimEnd(text) {
      gameScene.removeChild(text); // удаляем текст после завершения анимации
      text.destroy();
    }
  });

  removeAnimPromise.then(() => {
    fillUpVacancies(balls);
  });
};

export default removeBalls;
