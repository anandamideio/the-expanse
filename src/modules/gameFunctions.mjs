import {asyncForEach, µ, grabAll} from './env.mjs';

// Variables
const buttonAreaStart = `<div class="content" id="buttonArea">`;
const scriptAreaStart = `<div id="scriptArea">`
const divClose = `</div>`;


// Performs a health check on the player when passed the game engine
const healthCheck = function(game) {
  const playerHealth = game.player.value.health;
  let healthLvl;
  if (playerHealth < 4){healthLvl = 'nearDeath'};
  if (playerHealth >= 4 && playerHealth <= 10){healthLvl = 'lowHealth'};
  return healthLvl;
}

// Create a new button with your style
export const newBtn = ({id: id, click: click, val: val, text: text, self: self} = {}) => {
  const healthLvl = healthCheck(self);
  let btnClass;
  switch(healthLvl){
    case 'nearDeath':
      btnClass = 'button is-black is-medium';
      break;
    case 'lowHealth':
      btnClass = 'button is-gray is-medium';
      break;
    default:
      btnClass = 'button is-blue is-medium';
  }
  const btnContainer = `${buttonAreaStart}
    <button type="button" id="${id}" class="${btnClass}">${text}</button>
  ${divClose}`;
  µ('#buttonArea').replaceWith(btnContainer);
  const boundClick = click.bind(null, val, self);
  document.getElementById(id).addEventListener("click", boundClick);
  return {id: id, text: text, btnClass: btnClass, val: val, clickFn: click.name};
};

// Time Saving Functions
export const nodeVisToggle = (toggleNode, className) => {
  if (Array.isArray(toggleNode)) { // if passed an array of things to toggle visibility of, toggle all
    for (let step = 0; step < toggleNode.length; step++) {
      µ(`#${toggleNode[step]}`).toggleClass(`${className}`);
    }
  } else { // otherwise just toggle that one
    µ(`#${toggleNode}`).toggleClass(`${className}`);
  }
};

export const nodeContent = (selectedNode, content, animate, animation) => {
  const element = document.querySelector(`#${selectedNode}`);
  const handleAnimationEnd = () => {
    element.classList.remove('animated', animation, 'faster');
    element.removeEventListener('animationend', handleAnimationEnd);
  };
  if (animate === true) {
    document.getElementById(selectedNode).innerHTML = `${content}`;
    element.classList.add('animated', animation, 'faster');
    element.addEventListener('animationend', handleAnimationEnd);
  } else {
    document.getElementById(selectedNode).innerHTML = `${content}`;
  }
};
export default {nodeVisToggle, nodeContent, newBtn};
