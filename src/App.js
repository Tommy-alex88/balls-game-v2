import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

import { newBall } from "./gameComponents/newBall";
import { animateAtStart } from "./gameComponents/animateAtStart";
import myTexture from "./media/images/texture.png";

function App() {
  let ballsTable = [];
  const ref = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({ width: 800, height: 440 });
    ref.current.appendChild(app.view);
    const container = new PIXI.Container();
    app.stage.addChild(container);
    const backTexture = PIXI.Texture.from(myTexture);
    const sceneFrame = new PIXI.Sprite(backTexture);
    container.addChild(sceneFrame);

    for (let i = 0; i < 5; i++) {
      ballsTable[i] = [];
      for (let j = 0; j < 5; j++) {
        let ball = newBall(i, j); // создание шаров
        ballsTable[i][j] = ball; // обновляем нашу таблицу
        container.addChild(ball);
        animateAtStart(ball);
      }
    }

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={ref}></div>;
}

export default App;
