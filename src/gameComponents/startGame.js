import * as PIXI from "pixi.js";

import { soundOff } from "./sound";
import animateAtStart from "./utils/animateAtStart";
import processArray from "./utils/processArray";
import score from "./score";
import createTable from "./utils/createTable";

const app = new PIXI.Application({
  width: 430,
  height: 500,
});

app.loader.add([
  { name: "backTextureImg", url: "/images/texture.png" },
  { name: "spriteSheet", url: "/images/sprites/spriteSheet.json" },
  { name: "gameOverImg", url: "/images/GameOver2.png" },
]);

const gameScene = new PIXI.Container();
app.stage.addChild(gameScene);

app.loader.load(startGame);

function startGame(loader, resources) {
  const texture = app.loader.resources.backTextureImg.texture;
  const sceneFrame = new PIXI.Sprite(texture);
  gameScene.addChild(sceneFrame);

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
}

export { app, gameScene };
export default startGame;
