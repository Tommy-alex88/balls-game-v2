import * as PIXI from "pixi.js";

import { gameScene } from "./startGame";
import store from "../store";

let scoreText = null;

const score = () => {
  if (scoreText !== null) {
    gameScene.removeChild(scoreText);
  }
  const state = store.getState();
  scoreText = new PIXI.Text("Очки: " + state.score);
  scoreText.x = 50;
  scoreText.y = 140;
  gameScene.addChild(scoreText);
};

store.subscribe(score);

export default score;
