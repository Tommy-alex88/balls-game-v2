import * as PIXI from "pixi.js";
import { sound } from "@pixi/sound";

import { gameScene } from "./startGame";

let soundIcon = null;
let playing = false;

const soundOffTexture = PIXI.Texture.from("/images/soundOff.png");
const soundOnTexture = PIXI.Texture.from("/images/soundOn.png");

const gameSound = sound;
gameSound.add(
  {
    main: "/sounds/MainTheme.mp3",
    clickSound: "/sounds/click.mp3",
    ballOut: "/sounds/ballOut.mp3",
    ballIn: "/sounds/ballIn.mp3",
  },
  {
    preload: true,
  }
);

const setOptions = (sprite, clickHandler) => {
  sprite.height = 70;
  sprite.width = 70;
  sprite._anchor.set(0.5);
  sprite.position.set(100, 450);
  sprite.buttonMode = true;
  sprite.interactive = true;
  sprite.on("click", clickHandler);
  sprite.on("tap", clickHandler);
};

const changeIcon = (icon, texture, clickHandler) => {
  if (icon !== null) {
    icon.destroy();
  }
  icon = new PIXI.Sprite(texture);
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
