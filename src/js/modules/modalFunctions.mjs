import {µ} from '@abourass/micro'
import Modal from '../class/Modal.mjs';

// Modal Interactions

// Create a new modal
export const createModal = ({id: id, name: name, modalClass: modalClass, html: html, btnId: btnId, btn: btn} = {}) => {
  const newModal = Modal(id, name, modalClass, html);
  newModal.create();
  µ('#modalBtnArea').replaceWith(`<div id="modalBtnArea">${btn}</div>`);
  document.querySelector(`#${btnId}`).onclick = () => { newModal.show() }; // When the user clicks on the button, open the modal
  return newModal;
};
export default {createModal};
