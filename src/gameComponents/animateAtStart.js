import gsap from "gsap";

export const animateAtStart = (ball) => {
  ball.scale.x = 0.1;
  ball.scale.y = 0.1;
  gsap.to(ball, { duratjion: 0.3, rotation: (360 * Math.PI) / 180 });
  gsap.to(ball.scale, { duration: 0.3, x: 1, y: 1 });
};