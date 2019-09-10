import {player} from './modules/sweetAlerts.mjs';
import {newBtn} from './modules/gameFunctions.mjs';
import {introClick} from './modules/clickFunctions.mjs';

/* ==========================================================================
//                                 Game Engine                             //
===========================================================================*/

// The game engine is an object invoked via this function
const gameEngine = async function(){
  try {
  const game = {
    startGame: async function() {
      game.player = await player();
      game.buttons = [newBtn({id: 'introButton', click: introClick, val: 1, text: 'Panic!', engine: this})];
      console.log(this);
      return this;
    },
  };
  if (!game.player){ await game.startGame(); } // If no user has been created then lets run the user creation scripts
  return game;
  } catch (e) { console.error(e); }
};

// Invoke the Game Engine
gameEngine().catch(err => console.error(err));
