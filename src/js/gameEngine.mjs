import {player} from './modules/sweetAlerts.mjs';
import {newBtn} from './modules/buttonFunctions.mjs';
import {introClick} from './modules/clickFunctions.mjs';
import {createModal} from './modules/modalFunctions.mjs';
import User from './class/User.mjs';
import fs from 'fs';
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
      engine.buttons = [newBtn({_id: 'introButton', _click: introClick, _val: 1, _text: 'Panic!', _engine: this})];
      return this;
    },
    save() {
      this.buttons[0]._clickFnName = this.buttons[0].clickFn();
      window.localStorage.setItem('engine', JSON.stringify(this, null, 2));
      return this;
    },
    load() {
      window.introClick = introClick;
      const loadedEngine = JSON.parse(window.localStorage.getItem('engine'));
      console.log(`The loaded engine before config: ${JSON.stringify(loadedEngine, null, 2)}`);
      this.player = User().load(loadedEngine.player);
      if (loadedEngine.buttons.length === 1){
        loadedEngine.buttons[0]._engine = this;
        this.buttons = [newBtn(loadedEngine.buttons[0])];
      }
      console.log(engine);
      return this;
    },
    deleteSave() { window.localStorage.removeItem('engine'); return this; }
  };
  if (window.localStorage.getItem('engine') != null){ engine.load(); }
  else if (!engine.player){ await engine.startGame(); } // If no user has been created then lets run the user creation scripts
  document.getElementById('clearSave').addEventListener('click', engine.deleteSave);
  return engine;
  } catch (e) { console.error(e); }
};

// Invoke the Game Engine
gameEngine().catch(err => console.error(err));
