import {nodeContent} from '../modules/gameFunctions.mjs';
import {µ} from '@abourass/micro'

/* ==========================================================================
//                               Modal Class                               //
===========================================================================*/

export class Modal { // These are outside of the constructor to be compliant with private field declarations:
  #id; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations
  #name;
  #modalClass;
  #html;
  #button;
  #containerStart = `<div id="modalArea">`;
  #containerEnd = `</div>`;
  constructor(id, name, modalClass, html, button) {
    this.#id = id;
    this.#name = name;
    this.#modalClass = modalClass;
    this.#html = html;
    this.#button = button;
    this.create();
  }

  get id() { return this.#id; }
  get name() { return this.#name}

  get html() { return this.#html; }
  set html(value) {
    this.#html = value;
    const newModalArea = `${this.#containerStart} 
<div id="${this.id}" class="modal">   <!-- ${this.name} Modal -->
  <div class="modal-content">     <!-- Modal content -->
    <span class="close">&times;</span> 
    ${this.html} 
  </div>
</div>
${this.#containerEnd}`;
    µ('#modalArea').replaceWith(newModalArea);
  return this;
  }

  get modalClass() { return this.#modalClass; }
  set modalClass(value) {
    const oldClass = this.#modalClass;
    this.#modalClass = value;
    µ(`#${this.#id}`).removeClass(oldClass).addClass(this.#modalClass);
    return this;
  }

  create(){
    const newModalArea = `${this.#containerStart} 
<div id="${this.id}" class="modal">   <!-- ${this.name} Modal -->
  <div class="modal-content">     <!-- Modal content -->
    <span class="close">&times;</span> 
    ${this.html} 
  </div>
</div>
${this.#containerEnd}`;
    µ('#modalArea').replaceWith(newModalArea);
  }

  show(){
    const modal = document.querySelector(`#${this.id}`);
    modal.style.display = 'block';
    const span = document.querySelectorAll('.close')[0];
    span.onclick = function() {  modal.style.display = 'none'; }; // When the user clicks on <span> (x), close the modal
    window.onclick = function(event) { // When the user clicks anywhere outside of the modal, close it
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  destroy(){
    µ('#modalArea').replaceWith(`${this.#containerStart} ${this.#containerEnd}`)
  }
}
export default Modal;
