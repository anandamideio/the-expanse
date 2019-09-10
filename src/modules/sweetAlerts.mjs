import {createNewPlayer} from './userFunctions.mjs';

/* ==========================================================================
//                           SweetAlert2 Functions                         //
===========================================================================*/

// Get Characters Name (Use's SweetAlert Prompt to Ask For Character Name)
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
