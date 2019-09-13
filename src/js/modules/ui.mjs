import iziToast from 'izitoast';
import {animateUI} from './UI/animate.mjs';

let btnColor, btnClass;

// 00 - Performs a health check on the player when passed the game engine
export const healthCheck = function(game) {
  const playerHealth = game.player.value.health(); let healthLvl;
  if (playerHealth < 4) {healthLvl = 'nearDeath';}
  if (playerHealth >= 4 && playerHealth <= 10){healthLvl = 'lowHealth'}
  return healthLvl;
};

// 01 - Return a class with a color that changes depending on player health
export const buttonColor = function(health) {
  switch(health){
    case 'nearDeath': btnClass = 'button is-black is-medium'; btnColor = 'is-black'; break;
    case 'lowHealth': btnClass = 'button is-gray is-medium'; btnColor = 'is-gray'; break;
    default: btnClass = 'button is-blue is-medium'; btnColor = 'is-blue'; }
  return {class: btnClass, color: btnColor}
};

// 02 - Replace a node in the DOM and animate
export const ui = (selectedNode, content, animate, animation) => {
  const element = document.querySelector(`#${selectedNode}`);
  if (animate === true ){
    animateUI(selectedNode, animation, content)
  } else {
    element.innerHTML = `${content}`;
  }
};

// 03 - Creates a toast notification: {title: string, message: string}
export const notify = ({title: title, message: msg} = {}) => {
  return iziToast.show({title: title, message: msg, position: 'topRight'});
} ;

// 04 - Write a message on the story container
export const story = (str) => { ui('messageUI', str, true, 'fadeIn'); };

export default {healthCheck, buttonColor, ui, notify, story};
