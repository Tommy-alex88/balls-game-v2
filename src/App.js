import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

import { newBall, processArray } from "./gameComponents/newBall";
import { animateAtStart } from "./gameComponents/animateAtStart";
import myTexture from "./media/images/texture.png";
import { soundOff } from "./gameComponents/sound";

const app = new PIXI.Application({ width: 800, height: 440 });
const gameScene = new PIXI.Container();

function App() {
  let ballsTable = [];
  const ref = useRef(null);

  useEffect(() => {
    ref.current.appendChild(app.view);

    app.stage.addChild(gameScene);

    const backTexture = PIXI.Texture.from(myTexture);
    const sceneFrame = new PIXI.Sprite(backTexture);
    gameScene.addChild(sceneFrame);
    soundOff();

    for (let i = 0; i < 5; i++) {
      ballsTable[i] = [];
      for (let j = 0; j < 5; j++) {
        let ball = newBall(i, j, ballsTable); // создание шаров
        ballsTable[i][j] = ball; // обновляем нашу таблицу
        gameScene.addChild(ball);
        animateAtStart(ball);
      }
    }
    processArray(ballsTable);

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={ref}></div>;
}

export { gameScene };
export default App;
