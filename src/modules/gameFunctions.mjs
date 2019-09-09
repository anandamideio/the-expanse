import {asyncForEach, µ, grabAll} from './env.mjs';

// Variables
const buttonAreaStart = `<div class="content" id="buttonArea">`;
const divClose = `</div>`;

// Create a new button with your style
export const newBtn = ({id: id, click: click, btnClass: btnClass, text: text} = {}) => {
  const btnContainer = `${buttonAreaStart}
    <button type="button" onClick="${click}" id="${id}" class="${btnClass}">${text}</button>
  ${divClose}`;
  µ('#buttonArea').replaceWith(btnContainer);
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
