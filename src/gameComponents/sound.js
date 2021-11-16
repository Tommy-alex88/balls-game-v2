import * as PIXI from "pixi.js";
import { gameScene } from "../App";
import { sound } from "@pixi/sound";

import soundOnTexture from "../media/images/soundOn.png";
import soundOffTexture from "../media/images/soundOff.png";
import mainThemeSound from "../media/sounds/MainTheme.mp3";
import clickSound from "../media/sounds/click.mp3";
import ballOutSound from "../media/sounds/ballOut.mp3";

let soundIcon = null;
let playing = false;
const gameSound = sound;
gameSound.add(
  {
    main: mainThemeSound,
    clickBall: clickSound,
    ballOut: ballOutSound,
  },
  {
    preload: true,
  }
);

const setOptions = (sprite, clickHandler) => {
  sprite.height = 70;
  sprite.width = 70;
  sprite._anchor.set(0.5);
  sprite.position.set(100, 250);
  sprite.buttonMode = true;
  sprite.interactive = true;
  sprite.on("click", clickHandler);
};

const changeIcon = (icon, texture, clickHandler) => {
  if (icon !== null) {
    icon.destroy();
  }
  icon = new PIXI.Sprite(PIXI.Texture.from(texture));
  setOptions(icon, clickHandler);
  return icon;
};

//функция выключения звука во время игры
const soundOff = () => {
  gameSound.muteAll();

  soundIcon = changeIcon(soundIcon, soundOffTexture, soundOn);
  gameScene.addChild(soundIcon);
};

// // функция включения звука во время игры
const soundOn = () => {
  sound.unmuteAll();

  if (!playing) {
    gameSound.play("main", { loop: true, volume: 0.5 });
    playing = true;
  }
  soundIcon = changeIcon(soundIcon, soundOnTexture, soundOff);
  gameScene.addChild(soundIcon);
};

export { soundOn, soundOff, gameSound };
