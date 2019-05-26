import {User} from './modules/player.mjs';
import {nodeContent, nodeVisToggle} from './modules/gameFunctions.mjs';
import {introClick} from './modules/clickerFunctions.mjs';

try {
  Swal.fire({
    title: 'What is your characters name?',
    input: 'text',
    inputAttributes: {autocapitalize: 'on'},
    showCancelButton: false,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: (username) => {
      if (username.length >= 20) { username = 'I Chose A Long Name' } // Hee Hee
      nodeContent('storySoFar', `The Story So Far For ${username}..`, true, 'bounce');
      return username; // Initiate New User
    },
    allowOutsideClick: () => {
      nodeContent('storySoFar', `The Story So Far For The Unnamed One..`, true, 'bounce');
      return 'The Unnamed One'; // Initiate New User
    }
  }).then((username) => {
    let yPosition = 35, xPosition = 15, clockState;
    const player = new User(username), actionBtn = document.getElementById('actionBtn');
    actionBtn.onclick = function(){introClick(1, player)};
  });
} catch (err) {
  console.error(err)
}
