import React, { useEffect, useRef } from "react";

import { app } from "./startGame";

function Game() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.appendChild(app.view);

    app.start();

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={ref}></div>;
}

export default Game;
