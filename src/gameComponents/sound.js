import * as PIXI from "pixi.js";
import { sound } from "@pixi/sound";

import { gameScene } from "./startGame";
import soundOnTexture from "../assets/images/soundOn.png";
import soundOffTexture from "../assets/images/soundOff.png";
import mainThemeSound from "../assets/sounds/MainTheme.mp3";
import clickSound from "../assets/sounds/click.mp3";
import ballOutSound from "../assets/sounds/ballOut.mp3";
import ballInSound from "../assets/sounds/ballIn.mp3";

let soundIcon = null;
let playing = false;

const gameSound = sound;
gameSound.add(
  {
    main: mainThemeSound,
    clickBall: clickSound,
    ballOut: ballOutSound,
    ballIn: ballInSound,
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
