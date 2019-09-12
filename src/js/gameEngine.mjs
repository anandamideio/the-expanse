import {player} from './modules/sweetAlerts.mjs';
import {newBtn} from './modules/gameFunctions.mjs';
import {introClick} from './modules/clickFunctions.mjs';
import {createModal} from './modules/modalFunctions';
import fs from 'fs';
import {extend} from './modules/extend';
const statHTML = fs.readFileSync('./src/modals/stats.html', 'utf-8'); // Moving this until I'm ready to create the statModal
const statModal = createModal.bind(null, {id: 'testModal', name: 'Test Modal', modalClass: '', html: statHTML, btn: `<button type="button" class="button" id="openModal">Open Modal</button>`, btnId: 'openModal' });

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
      const protoEngine = {};
      protoEngine.player = Object.assign({ __proto__: this.player.value.__proto__ }, this.player.value.__proto__);
      console.log(`protoEngine is -------- ${JSON.stringify(protoEngine)}`);
      // window.localStorage.setItem('engine', JSON.stringify(protoEngine));
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
    toJSON: function() {
      const tmp = {};
      for(const key in this) {
        if(typeof this[key] !== 'function')
          tmp[key] = this[key];
      }
      return tmp;
    }
  };
  if (window.localStorage.getItem('engine') != null){ engine.load(); }
  else if (!engine.player){ await engine.startGame(); } // If no user has been created then lets run the user creation scripts
  document.getElementById('clearSave').addEventListener('click', engine.deleteSave);
  return engine;
  } catch (e) { console.error(e); }
};

// Invoke the Game Engine
gameEngine().catch(err => console.error(err));
