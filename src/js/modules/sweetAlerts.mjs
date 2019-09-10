import {createNewPlayer} from './userFunctions.mjs';
import Swal from '../../../node_modules/sweetalert2/dist/sweetalert2.min';

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
    preConfirm: async(username) => { const newPlayer = await createNewPlayer(username); return newPlayer; }, // DON'T INLINE these
    allowOutsideClick: async() => { const newPlayer = await createNewPlayer('The Unnamed One'); return newPlayer; },
  });
  return newPlayer;
};

export default {player};
