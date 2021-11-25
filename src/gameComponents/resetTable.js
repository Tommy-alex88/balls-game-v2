import gsap from "gsap";

import { gameScene } from "./startGame";
import { gameSound } from "./sound";
import gameOver from "./gameOver";

const resetTable = (table) => {
  // Удаляем все шары из игровой сцены и из таблицы с анимацией
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      gameSound.play("ballOut");
      new gsap.to(table[i][j].scale, {
        duration: 1,
        x: 0.1,
        y: 0.1,
        onComplete: del,
        onCompleteParams: [table, i, j],
      });
    }
  }
  function del(table, i, j) {
    gameScene.removeChild(table[i][j]);
    table[i][j] = null;
    gameOver();
  }
};

export default resetTable;
