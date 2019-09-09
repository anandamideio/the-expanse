import {createNewPlayer} from './userFunctions.mjs';

// Get Characters Name (Use's SweetAlert Prompt to Ask For Character Name)
export const player = async() => {
  const newPlayer = await Swal.fire({
    title: 'What is your characters name?',
    input: 'text',
    inputAttributes: {autocapitalize: 'on'},
    showCancelButton: false,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: async(username) => { const newPLayer = await createNewPlayer(username); return newPlayer; },
    allowOutsideClick: async() => { const newPlayer = await createNewPlayer('The Unnamed One'); return newPlayer; },
  });
  return newPlayer;
};

export default {player};
