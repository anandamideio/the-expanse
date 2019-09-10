import {player} from './modules/sweetAlerts.mjs';
import {newBtn} from './modules/gameFunctions.mjs';
import {introClick} from './modules/clickFunctions.mjs';

const gameEngine = async function(){
  try {
  const game = {
    startGame: async function() {
      game.player = await player();
      game.buttons = [newBtn({id: 'introButton', click: introClick, val: 1, text: 'Panic!', self: this})];
      console.log(this)
      return this;
    },
  };
  if (!game.player){ await game.startGame(); } // If no user has been created then lets run the user creation scripts
  return game;
  } catch (e) { console.error(e); }
};

gameEngine().catch(err => console.error(err));
