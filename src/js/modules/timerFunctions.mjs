import {ui} from './ui.mjs';
import {nodeVisToggle} from './buttonFunctions';

export const healthTimer = () => {
  if (player.health >= 100) {
    ui('messageUI', 'In your sleep you hear whispers from something. You strain to hear what they are saying but you can\'t quite make it out. Suddenly, the whispers stop and a loud voice says "Ah shit! I forgot to send you back with any memory.. Well, oh well. Nothing I can do about it now. Well, since I\'m here, may well let you allocate your new personality."');
    nodeVisToggle(['allocatePersonalityButton'], 'hidden');
    stopTimer(clockState);
  } else if (player.health < 100) {
    player.incHealth(5);
    ui('healthUILeveled', player.health, true, 'bounce');
  }
};

export const stopTimer = (timerToStop) => { clearInterval(timerToStop); };

export default {healthTimer, stopTimer}
