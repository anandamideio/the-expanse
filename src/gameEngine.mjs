import {player} from './modules/sweetAlerts.mjs';
import {log, µ, asyncForEach} from './modules/env.mjs';
import {introClick, goRight, goLeft, enterHome, findingHomeClick} from './modules/clickFunctions.mjs';
import {newBtn} from './modules/gameFunctions.mjs';

const gameEngine = function(){
  const game = {
    startGame: async function() {
      game.player = await player();
      newBtn({id: 'introButton', click: 'introClick(1)', btnClass: 'button is-black is-medium', text: 'Panic!'});
      return this;
    },
  };
  if (!game.player){ game.startGame(); } // If no user has been created then lets run the user creation scripts
  return game;
};

gameEngine();
