import React, { useEffect, useRef } from "react";

import { app } from "./gameComponents/startGame";
import startGame from "./gameComponents/startGame";

function App() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.appendChild(app.view);

    startGame();

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={ref}></div>;
}

export default App;
