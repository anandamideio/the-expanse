import {player} from './modules/sweetAlerts.mjs';
import {log, µ, asyncForEach} from './modules/env.mjs';
import {introClick, goRight, goLeft, enterHome, findingHomeClick} from './modules/clickFunctions.mjs';
import {newBtn} from './modules/gameFunctions.mjs';

const gameEngine = async function(){
  try {
  const game = {
    startGame: async function() {
      game.player = await player();
      game.buttons = [newBtn({id: 'introButton', click: 'introClick(1)', text: 'Panic!', self: this})];
      return this;
    },
  };
  if (!game.player){ await game.startGame(); } // If no user has been created then lets run the user creation scripts
  return game;
  } catch (e) { console.error(e); }
};

gameEngine().catch(err => console.error(err));
