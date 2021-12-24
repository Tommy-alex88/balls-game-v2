import Game from "./gameComponents/Game";
import classes from "./App.module.css";

export const App = () => {
  return (
    <div className={classes.game}>
      <Game />
    </div>
  );
};
export default App;
