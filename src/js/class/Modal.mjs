import {µ} from '@abourass/micro';

/* ==========================================================================
//                               Modal Class                               //
===========================================================================*/
export const Modal = function(id, name, modalClass, html, button) {
  return {
    "_id": id,
    "_name": name,
    "_modalClass": modalClass,
    "_html": html,
    "_button": button,
    "_containerStart": `<div id="modalArea">`,
    "_containerEnd": `</div>`,
    id(str) {
      if (!str) {
        return this._id;
      } else {
        this._id = str;
        return this;
      }
    },
    name(str) {
      if (!str) {
        return this._name
      } else {
        this._name = str;
        return this
      }
    },
    html(str) {
      if (!str) {
        return this._html;
      } else {
        this._html = str;
        const newModalArea = `${this._containerStart} <div id="${this._id}" class="modal"> <!-- ${this._name} Modal --> <div class="modal-content"> <!-- Modal content --> <span class="close">&times;</span>  ${this._html} </div> </div> ${this._containerEnd}`;
        µ('#modalArea')
          .replaceWith(newModalArea);
        return this;
      }
    },
    modalClass(str) {
      if (!str) {
        return this._modalClass;
      } else {
        const oldClass = this._modalClass;
        this._modalClass = str;
        µ(`#${this._id}`)
          .removeClass(oldClass)
          .addClass(this._modalClass);
        return this;
      }
    },
    create() {
      const newModalArea = `${this._containerStart} <div id="${this._id}" class="modal"> <!-- ${this._name} Modal -->
      <div class="modal-content"> <!-- Modal content --> <span class="close">&times;</span> ${this._html} </div> </div>
      ${this._containerEnd}`;
      µ('#modalArea')
        .replaceWith(newModalArea);
    },
    show() {
      const modal = document.querySelector(`#${this._id}`);
      modal.style.display = 'block';
      const span = document.querySelectorAll('.close')[0];
      span.onclick = function() {
        modal.style.display = 'none';
      }; // When the user clicks on <span> (x), close the modal
      window.onclick = function(event) { // When the user clicks anywhere outside of the modal, close it
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    },
    destroy() {
      µ('#modalArea')
        .replaceWith(`${this._containerStart} ${this._containerEnd}`)
    }
  };
};
export default Modal;
