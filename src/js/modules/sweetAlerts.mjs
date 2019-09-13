import Swal from './../../../node_modules/sweetalert2/dist/sweetalert2.min';
import User from '../class/User';
import {ui} from './ui.mjs';

/* ==========================================================================
//                           SweetAlert2 Functions                         //
===========================================================================*/

// Prompt for the players name, and create a new instance of the player class from that name
export const player = async() => {
  const newPlayer = await Swal.fire({
    title: 'What is your characters name?',
    input: 'text',
    inputAttributes: {autocapitalize: 'on'},
    showCancelButton: false,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: async(username) => { ui('storySoFar', `The Story So Far For ${username}..`, true, 'bounce'); return User(username); },
    allowOutsideClick: async() => { ui('storySoFar', `The Story So Far For The Unnamed One..`, true, 'bounce'); return User('The Unnamed One'); },
  });
  return newPlayer;
};

export default {player};
