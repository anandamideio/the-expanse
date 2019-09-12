import {player} from './modules/sweetAlerts.mjs';
import {newBtn} from './modules/gameFunctions.mjs';
import {introClick} from './modules/clickFunctions.mjs';
import {µ} from './modules/env.mjs';

/* ==========================================================================
//                                 Game Engine                             //
===========================================================================*/

// The game engine is an object invoked via this function
const gameEngine = async function(){
  try {
  let engine = {
    startGame: async function() {
      engine.player = await player();
      engine.buttons = [newBtn({id: 'introButton', click: introClick, val: 1, text: 'Panic!', engine: this})];
      console.log(this);
      return this;
    },
    saveGame: function() {
      window.localStorage.setItem('engine', JSON.stringify(this));
      return this;
    },
    loadGame: function() {
      const loadedEngine = JSON.parse(window.localStorage.getItem('engine'));
      this.player = loadedEngine.player;
      this.buttons = loadedEngine.buttons;
      console.log(engine);
      return this;
    },
    deleteSave: function() {
      window.localStorage.removeItem('engine');
      engine.startGame();
    }
  };
  if (window.localStorage.getItem('engine') != null){ engine.loadGame(); }
  else if (!engine.player){ await engine.startGame(); } // If no user has been created then lets run the user creation scripts
  document.getElementById('clearSave').addEventListener('click', engine.deleteSave);
  return engine;
  } catch (e) { console.error(e); }
};

// Invoke the Game Engine
gameEngine().catch(err => console.error(err));
