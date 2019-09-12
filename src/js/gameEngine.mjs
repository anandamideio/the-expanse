import {player} from './modules/sweetAlerts.mjs';
import {newBtn} from './modules/gameFunctions.mjs';
import {introClick} from './modules/clickFunctions.mjs';

/* ==========================================================================
//                                 Game Engine                             //
===========================================================================*/

// The game engine is an object invoked via this function
const gameEngine = async function(){
  try {
  let engine = {
    async startGame() {
      engine.player = await player();
      engine.buttons = [newBtn({id: 'introButton', click: introClick, val: 1, text: 'Panic!', engine: this})];
      return this;
    },
    save() {
      console.log(engine);
      window.localStorage.setItem('engine', JSON.stringify(engine));
      return this;
    },
    load() {
      const loadedEngine = JSON.parse(window.localStorage.getItem('engine'));
      this.player = loadedEngine.player;
      this.buttons = loadedEngine.buttons;
      console.log(engine);
      return this;
    },
    deleteSave() {
      window.localStorage.removeItem('engine');
      return this;
    },
  };
  if (window.localStorage.getItem('engine') != null){ engine.load(); }
  else if (!engine.player){ await engine.startGame(); } // If no user has been created then lets run the user creation scripts
  document.getElementById('clearSave').addEventListener('click', engine.deleteSave);
  return engine;
  } catch (e) { console.error(e); }
};

// Invoke the Game Engine
gameEngine().catch(err => console.error(err));
