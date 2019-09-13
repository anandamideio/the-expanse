import {µ} from '@abourass/micro'
import Button from '../class/Button.mjs';
import {healthCheck, buttonColor} from './ui';

/* ==========================================================================
//                           Time Saving Functions                         //
=============================================================================
                              TABLE OF CONTENTS
 ============================================================================
 0. newBtn - Create a new button with an attached event listener
 1. newBtns
 2. nodeVisToggle - toggle a class
 ===========================================================================*/

// Variable Declarations
const buttonAreaStart = `<div class="content" id="buttonArea">`, divClose = `</div>`; let btnColor;

// 00 - Create a new button with an attached event listener the fires the function you pass
export const newBtn = ({id: id, click: click, val: val, text: text, engine: engine} = {}) => {
  if (engine.buttons){engine.buttons = []}
  // First pass the engine (containing our User class) to a health check function, which is passed to the switch below
  const healthLvl = healthCheck(engine);
  // so we can get the class for the button (color is dependent on health level)
  const buttonsAssets = buttonColor(healthLvl);
  // Now we make the string containing the HTML for our button
  const btnContainer = `${buttonAreaStart}  <button type="button" id="${id}" class="${buttonsAssets.class}">${text}</button> ${divClose}`;
  // Replace the current button / button area with the string above
  µ('#buttonArea').replaceWith(btnContainer);
  // Bind the value passed, and the engine to be passed to the click function that our event listener will fire
  const boundClick = click.bind(null, val, engine);
  // Create our event listener
  document.getElementById(id).addEventListener("click", boundClick);
  // Create a new instance of the button class and return it to the engine
  return Button(id, boundClick, val, text, buttonsAssets.color);
};

// 01 - Create new buttons with attached event listeners
export const newBtns = (arrayOfBtn, engine) => {
  try {
    let btnString = '';
    const healthLvl = healthCheck(engine);     // First pass the engine (containing our User class) to a health check function
    const buttonAssets = buttonColor(healthLvl); // so we can get the class for the button (color is dependent on health level)
    arrayOfBtn.forEach((btn) => { console.log(btn); btnString += `<button type="button" id="${btn.id}" class="${buttonAssets.class}">${btn.text}</button> `; console.log(btnString)});
    if (engine.buttons){engine.buttons = []}
    const btnContainer = `${buttonAreaStart} ${btnString}${divClose}`;
    // Replace the current button / button area with the string above
    µ('#buttonArea').replaceWith(btnContainer);
    arrayOfBtn.forEach((btn) => {
      // Bind the value passed, and the engine to be passed to the click function that our event listener will fire
      const boundClick = btn.click.bind(null, btn.val, engine);
      // Create our event listener
      document.getElementById(btn.id).addEventListener("click", boundClick);
      // Create a new instance of the button class and return it to the engine
      const newBtn = Button(btn.id, boundClick, btn.val, btn.text, btnColor);
      arrayOfBtn.push(newBtn);
    });
    return arrayOfBtn;
  } catch (e) { console.error(e); }
};

// 02 - Toggle the content of a node on the DOM tree, and animate the change if you want
// 04 - Toggle a Class
export const nodeVisToggle = (toggleNode, className) => {
  if (Array.isArray(toggleNode)) { // if passed an array of things to toggle visibility of, toggle all
    for (let step = 0; step < toggleNode.length; step++) {
      µ(`#${toggleNode[step]}`).toggleClass(`${className}`);
    }
  } else { // otherwise just toggle that one
    µ(`#${toggleNode}`).toggleClass(`${className}`);
  }
};

export default {newBtn, newBtns, nodeVisToggle};
