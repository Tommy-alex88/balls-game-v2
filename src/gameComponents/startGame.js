import * as PIXI from "pixi.js";

import { soundOff } from "./sound";
import newBall from "./newBall";
import animateAtStart from "./animateAtStart";
import processArray from "./processArray";
import myTexture from "../assets/images/texture.png";
import score from "./score";
import createTable from "./createTable";

const app = new PIXI.Application({ width: 800, height: 440 });
const gameScene = new PIXI.Container();
app.stage.addChild(gameScene);

const backTexture = PIXI.Texture.from(myTexture);
const sceneFrame = new PIXI.Sprite(backTexture);
gameScene.addChild(sceneFrame);

const startGame = () => {
  score();
  soundOff();
  const table = createTable(true);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      gameScene.addChild(table[i][j]);
      animateAtStart(table[i][j]);
    }
  }
  processArray(table);
};

export { app, gameScene };
export default startGame;
