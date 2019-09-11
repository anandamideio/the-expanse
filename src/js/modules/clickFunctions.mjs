import {newBtn, nodeContent, nodeVisToggle, notify, story} from './gameFunctions.mjs';
import {asyncForEach, µ, grabAll, log} from './env.mjs';
import {createMap, createPlayer, redrawMap, deleteScripts, clearCanvas} from './mapFunctions';

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
  if (player.health === 2) {
    notify({ title: 'Hey', message: 'You\'re still Alive?'});
  } else if (player.health === 5) {
    btn.text = 'Cough';
  } else if (player.health === 6) {
    story('Your throat tightens painfully with each cough.')
  } else if (player.health === 7) {
    notify({ title: 'Hmmm..', message: 'You should probably take it slow, you don\'t look so good.'});
  } else if (player.health === 8 || player.health === 9) {
    story('A particularly hard cough leaves blood on the pavement next to your face. You are acutely aware of how raw your throat is.')
  } else if (player.health === 10) {
    btn.text = 'Breathe';
    btn.color = 'is-grey';
    story('You realize you\'re laying on cold concrete, in an alley of some sort. Your head swims..')
  } else if (player.health === 15) {
    player.money = 0;
    player.karma = 0;
    player.awareness = 0;
    engine.buttons.unshift(newBtn({id: 'findingHomeButton', click: findingHomeClick, val: 4, text: 'Look Around', engine: engine}));
    nodeVisToggle(['map'], 'hidden');
    story('You sit up and try to remember what happened.. or to remember anything at all. What happened, Why am I here, who am I?!?');
    createMap(1);
    return createPlayer(36, 20);
  }
};

export const findingHomeClick = (clickValue, engine) => {
  // Grab the player from the engine
  const player = engine.player.value;
  let yPosition = 35, xPosition = 15, currentLocation = 'a dirty alley';
  if (player.awareness <= 16) {
    story('You make your way slowly down the alley');
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap(1);
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if (player.awareness >= 17 && player.awareness <= 20) {
    player.location = 'The City';
    story('After limping to the end of the alley you\'ve made it to an unfamiliar street. Where to now?');
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap(1);
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if (player.awareness === 24) {
    story('After limping to the end of the alley you\'ve made it to an unfamiliar street. Where to now?');
    deleteScripts();
    createMap(2);
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    createPlayer(yPosition, xPosition);
    µ('#findingHomeButton').replaceWith(`<button type="button" onClick="goLeft()" id="goLeftButton" class="button is-info is-medium">Go Left</button>
                    <button type="button" onClick="goRight()" id="goRightButton" class="button is-info is-medium">Go Right</button>`);
  }
};

export const goLeft = (engine) => {
  // Grab the player from the engine
  const player = engine.player.value;

  player.location = 'In front of a home';
  story('You head left, down the street. You begin to see some familiar buildings, so trusting your instincts you continue where feels most familiar. It isn\'t long before you find yourself in front of house that feels as if it must be home, even if you have no specific memories of living there.')
  µ('#map').replaceWith('');
  µ('#goLeftButton').replaceWith('');
  µ('#goRightButton').replaceWith(' <button type="button" onClick="enterHome()" id="enterHomeButton" class="button is-info is-medium">Enter Home</button>');
};

export const goRight = (engine) => {
  // Grab the player from the engine
  const player = engine.player.value;

  player.location = 'In front of a home.';
  story('You head right, down the street. You begin to see some familiar buildings, so trusting your instincts you continue where feels most familiar. It isn\'t long before you find yourself in front of house that feels as if it must be home, even if you have no specific memories of living there.')
  µ('#map').replaceWith('');
  µ('#goLeftButton').replaceWith('');
  µ('#goRightButton').replaceWith(' <button type="button" onClick="enterHome()" id="enterHomeButton" class="button is-info is-medium">Enter Home</button>');
};

export const enterHome = (engine) => {
  // Grab the player from the engine
  const player = engine.player.value;

  player.location = 'Home';
  nodeContent('messageUI', 'You enter the home, and sit down on the stained and shabby couch. The room begins to spin, and as the wave of adrenalin leaves you, you pass out');
  nodeVisToggle(['enterHomeButton'], 'hidden');
  return clockState = setInterval(healthTimer, 1000);
};

function allocatePersonality(statPoints) {

}
export default {introClick, findingHomeClick, enterHome, goLeft, goRight, allocatePersonality};
