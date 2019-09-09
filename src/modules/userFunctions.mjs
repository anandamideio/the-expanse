import User from '../class/User.mjs';

// Create a new instance of the player class
export const createNewPlayer = async(inputName) => {
  let username;
  username = inputName;
  nodeContent('storySoFar', `The Story So Far For ${username}..`, true, 'bounce');
  return new User(`${username}`); // Initiate New User
};

export default {createNewPlayer};
