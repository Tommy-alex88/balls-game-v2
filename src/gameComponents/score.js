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
  scoreText.anchor.set(0.5);
  scoreText.x = 250;
  scoreText.y = 450;
  gameScene.addChild(scoreText);
};

store.subscribe(score);

export default score;
