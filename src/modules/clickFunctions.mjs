import {nodeContent, nodeVisToggle} from './gameFunctions.mjs';
import {asyncForEach, µ, grabAll, log} from './env.mjs';

// Click Functions

export const introClick = (clickValue) => {
  player.incHealth(clickValue);
  nodeContent('healthUILeveled', player.health, true, 'bounce');
  if (player.health === 2) {
    iziToast.show({
      title: 'Hey',
      message: 'You\'re still Alive?',
      position: 'topRight',
    });
  } else if (player.health === 5) {
    nodeContent('introButton', 'Cough');
  } else if (player.health === 6) {
    nodeContent('messageUI', 'Your throat tightens painfully with each cough.', true, 'fadeIn');
  } else if (player.health === 7) {
    iziToast.show({
      title: 'Hmmm..',
      message: 'You should probably take it slow, you don\'t look so good.',
      position: 'topRight',
    });
  } else if (player.health === 8 || player.health === 9) {
    nodeContent('messageUI', 'A particularly hard cough leaves blood on the pavement next to your face. You are acutely aware of how raw your throat is. ', true, 'fadeIn');
  } else if (player.health === 10) {
    nodeContent('introButton', 'Breathe');
    nodeContent('messageUI', 'You realize you\'re laying on cold concrete, in an alley of some sort. Your head swims..', true, 'fadeIn');
  } else if (player.health === 15) {
    µ('#introButton').replaceWith('<button type="button" onClick="findingHomeClick(4)" id="findingHomeButton" class="button is-info is-medium">Look Around</button>');
    nodeVisToggle(['map'], 'hidden');
    nodeContent('messageUI', 'You sit up and try to remember what happened.. or to remember anything at all. What happened, Why am I here, who am I?!?', true, 'fadeIn');
    nodeContent('healthUILeveled', player.health, true, 'bounce');
    nodeContent('moneyUILeveled', player.money, true, 'bounce');
    nodeContent('awarenessUILeveled', player.awareness, true, 'bounce');
    nodeContent('karmaUILeveled', player.karma, true, 'bounce');
    createMap(1);
    return createPlayer(36, 20);
  }
};

export const findingHomeClick = (clickValue) => {
  if (player.awareness <= 16) {
    nodeContent('messageUI', 'You make your way slowly down the alley');
    player.incAwareness(clickValue);
    nodeContent('awarenessUILeveled', player.awareness, true, 'bounce');
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap(1);
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if (player.awareness >= 17 && player.awareness <= 20) {
    player.setLocation('The City');
    nodeContent('messageUI', 'After limping to the end of the alley you\'ve made it to an unfamiliar street. Where to now?');
    nodeContent('locationUILeveled', player.location, true, 'bounce');
    player.incAwareness(clickValue);
    nodeContent('awarenessUILeveled', player.awareness, true, 'bounce');
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap(1);
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if (player.awareness === 24) {
    nodeContent('messageUI', 'After limping to the end of the alley you\'ve made it to an unfamiliar street. Where to now?');
    deleteScripts();
    createMap(2);
    player.incAwareness(clickValue);
    nodeContent('awarenessUILeveled', player.awareness, true, 'bounce');
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    createPlayer(yPosition, xPosition);
    $('#findingHomeButton').replaceWith(`<button type="button" onClick="goLeft()" id="goLeftButton" class="button is-info is-medium">Go Left</button>
                    <button type="button" onClick="goRight()" id="goRightButton" class="button is-info is-medium">Go Right</button>`);
  }
};

export const goLeft = () => {
  player.setLocation('In front of a home');
  nodeContent('locationUILeveled', player.location);
  nodeContent('messageUI', 'You head left, down the street. You begin to see some familiar buildings, so trusting your instincts you continue where feels most familiar. It isn\'t long before you find yourself in front of house that feels as if it must be home, even if you have no specific memories of living there.');
  $('#map').replaceWith('');
  $('#goLeftButton').replaceWith('');
  $('#goRightButton').replaceWith(' <button type="button" onClick="enterHome()" id="enterHomeButton" class="button is-info is-medium">Enter Home</button>');
};

export const goRight = () => {
  player.setLocation('In front of a home.');
  nodeContent('locationUILeveled', player.location);
  nodeContent('messageUI', 'You head right, down the street. You begin to see some familiar buildings, so trusting your instincts you continue where feels most familiar. It isn\'t long before you find yourself in front of house that feels as if it must be home, even if you have no specific memories of living there.');
  $('#map').replaceWith('');
  $('#goLeftButton').replaceWith('');
  $('#goRightButton').replaceWith(' <button type="button" onClick="enterHome()" id="enterHomeButton" class="button is-info is-medium">Enter Home</button>');
};

export const enterHome = () => {
  player.setLocation('Home');
  nodeContent('messageUI', 'You enter the home, and sit down on the stained and shabby couch. The room begins to spin, and as the wave of adrenalin leaves you, you pass out');
  nodeVisToggle(['enterHomeButton'], 'hidden');
  return clockState = setInterval(healthTimer, 1000);
};

function allocatePersonality(statPoints) {

}
export default {introClick, findingHomeClick, enterHome, goLeft, goRight, allocatePersonality};
