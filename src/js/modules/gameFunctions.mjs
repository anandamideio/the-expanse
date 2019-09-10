import {asyncForEach, µ, grabAll} from './env.mjs';
import * as iziToast from './../../../node_modules/izitoast/dist/js/iziToast.min'

/* ==========================================================================
//                           Time Saving Functions                         //
=============================================================================
                              TABLE OF CONTENTS
 ============================================================================
 0. healthCheck - Perform a health check on the player (via the engine)
 1. newBtn - Create a new button with an attached event listener
 2. nodeVisToggle - toggle a class
 3. nodeContent - Change the contents of a node on the DOM
 ===========================================================================*/

// 00 - Performs a health check on the player when passed the game engine
export const healthCheck = function(game) {
  const playerHealth = game.player.value.health; let healthLvl;
  if (playerHealth < 4) {healthLvl = 'nearDeath';}
  if (playerHealth >= 4 && playerHealth <= 10){healthLvl = 'lowHealth'}
  return healthLvl;
};

// 01 - Create a new button with an attached event listener the fires the function you pass
export const newBtn = ({id: id, click: click, val: val, text: text, engine: engine} = {}) => {
  // Variable Declarations
  const buttonAreaStart = `<div class="content" id="buttonArea">`, divClose = `</div>`; let btnClass;
  // First pass the engine (containing our User class) to a health check function, which is passed to the switch below
  const healthLvl = healthCheck(engine);
  // so we can get the class for the button (color is dependent on health level)
  switch(healthLvl){
    case 'nearDeath': btnClass = 'button is-black is-medium'; break;
    case 'lowHealth': btnClass = 'button is-gray is-medium'; break;
    default: btnClass = 'button is-blue is-medium'; }
  // Now we make the string containing the HTML for our button
  const btnContainer = `${buttonAreaStart}  <button type="button" id="${id}" class="${btnClass}">${text}</button> ${divClose}`;
  // Replace the current button / button area with the string above
  µ('#buttonArea').replaceWith(btnContainer);
  // Bind the value passed, and the engine to be passed to the click function that our event listener will fire
  const boundClick = click.bind(null, val, engine);
  // Create our event listener
  document.getElementById(id).addEventListener("click", boundClick);
  // Return a record of the button for the engine
  return {id: id, text: text, btnClass: btnClass, val: val, clickFn: click.name};
};

// 02 - Toggle a Class
export const nodeVisToggle = (toggleNode, className) => {
  if (Array.isArray(toggleNode)) { // if passed an array of things to toggle visibility of, toggle all
    for (let step = 0; step < toggleNode.length; step++) {
      µ(`#${toggleNode[step]}`).toggleClass(`${className}`);
    }
  } else { // otherwise just toggle that one
    µ(`#${toggleNode}`).toggleClass(`${className}`);
  }
};

// 03 - Toggle the content of a node on the DOM tree, and animate the change if you want
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

// 04 - Creates a toast notification: {title: string, message: string}
export const notify = ({title: title, message: msg} = {}) => {
  return iziToast.show.bind(null, {title: title, message: msg, position: 'topRight'});
} ;
export default {nodeVisToggle, nodeContent, newBtn, healthCheck, notify};
