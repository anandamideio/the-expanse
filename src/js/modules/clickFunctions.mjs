import {newBtn, newBtns, nodeVisToggle} from './buttonFunctions.mjs';
import {µ} from '@abourass/micro'
import {createMap, createPlayer, redrawMap, deleteScripts, clearCanvas} from './mapFunctions';
import {ui, story, notify} from './ui';

/* ==========================================================================
//                             Click Functions                             //
=============================================================================
                              TABLE OF CONTENTS
 ============================================================================
 0. introClick - Increase health from 0 -> 15, create the map
 ===========================================================================*/

// 00 - Increase health from 0 -> 15, create the map
export const introClick = (clickValue, engine) => {
  const player = engine.player.value; // Grab the player from the engine
  const btnArray = engine.buttons.filter(button => { return button.id === 'introButton'});
  const btn = btnArray[0]; // Grab the button that is associated with this function
  player.incHealth(clickValue); // Increase the player's health
  engine.save();
  if (player.health() === 2) {
    notify({ title: 'Hey', message: 'You\'re still Alive?'});
  } else if (player.health() === 5) {
    btn.text('Cough');
  } else if (player.health() === 6) {
    story('Your throat tightens painfully with each cough.')
  } else if (player.health() === 7) {
    notify({ title: 'Hmmm..', message: 'You should probably take it slow, you don\'t look so good.'});
  } else if (player.health() === 8 || player.health() === 9) {
    story('A particularly hard cough leaves blood on the pavement next to your face. You are acutely aware of how raw your throat is.')
  } else if (player.health() === 10) {
    btn.text('Breathe');
    btn.color('is-grey');
    story('You realize you\'re laying on cold concrete, in an alley of some sort. Your head swims..')
  } else if (player.health() === 15) {
    player.money(0); player.karma(0); player.awareness(0); player.location('a dirty alley');
    engine.buttons.unshift(newBtn({id: 'findingHomeButton', click: findingHomeClick, val: 4, text: 'Look Around', engine: engine}));
    nodeVisToggle(['map'], 'hidden');
    story('You sit up and try to remember what happened.. or to remember anything at all. What happened, Why am I here, who am I?!?');
    createMap(1);
    return createPlayer(36, 20);
  }
};

export const findingHomeClick = (clickValue, engine) => {
  // Grab the player from the engine
  const player = engine.player.value; let yPosition = 35, xPosition = 15;
  if (player.awareness() <= 16) {
    story('You make your way slowly down the alley');
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap(1);
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if (player.awareness() >= 17 && player.awareness() <= 20) {
    player.location('The City');
    story('After limping to the end of the alley you\'ve made it to an unfamiliar street. Where to now?');
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap(1);
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if (player.awareness() === 24) {
    story('After limping to the end of the alley you\'ve made it to an unfamiliar street. Where to now?');
    deleteScripts();
    createMap(2);
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    createPlayer(yPosition, xPosition);
    newBtns([{id: 'goLeftButton', click: goLeft, val: 0, text: 'Go Left'}, {id: 'goRightButton', click: goRight, val: 0, text: 'Go Right'}], engine).forEach((btn) => engine.buttons.unshift(btn));
  }
};

export const goLeft = (engine) => {
  const player = engine.player.value;   // Grab the player from the engine
  player.location('In front of a home.');
  story('You head left, down the street. You begin to see some familiar buildings, so trusting your instincts you continue where feels most familiar. It isn\'t long before you find yourself in front of house that feels as if it must be home, even if you have no specific memories of living there.')
  µ('#map').replaceWith('');
  engine.buttons.unshift(newBtn({id: 'enterHomeButton', click: enterHome, val: 0, text: 'Enter Home', engine: engine}));
};

export const goRight = (engine) => {
  const player = engine.player.value; // Grab the player from the engine
  player.location('In front of a home.');
  story('You head right, down the street. You begin to see some familiar buildings, so trusting your instincts you continue where feels most familiar. It isn\'t long before you find yourself in front of house that feels as if it must be home, even if you have no specific memories of living there.')
  µ('#map').replaceWith('');
  engine.buttons.unshift(newBtn({id: 'enterHomeButton', click: enterHome, val: 0, text: 'Enter Home', engine: engine}));
};

export const enterHome = (engine) => {
  const player = engine.player.value; // Grab the player from the engine
  player.location('Home');
  story('You enter the home, and sit down on the stained and shabby couch. The room begins to spin, and as the wave of adrenalin leaves you, you pass out');
  nodeVisToggle(['enterHomeButton'], 'hidden');
  return clockState = setInterval(healthTimer, 1000);
};

function allocatePersonality(statPoints) {

}
export default {introClick, findingHomeClick, enterHome, goLeft, goRight, allocatePersonality};
