// Variables
let yPosition = 35, xPosition = 15, currentLocation = 'a dirty alley', clockState;

// User Class
class User {
  constructor(name) {
    let health = 0, money = 0, awareness = 0, karma = 0;
    this._name = name;
    this._health = health;
    this._money = money;
    this._awareness = awareness;
    this._karma = karma;
    this._location = currentLocation;
  }

  get name() { return this._name; }
  set name(value) { this._name = value; }

  get health() { return this._health; }
  set health(value) { this._health = value; }
  incHealth(clickValue) { this.health += clickValue; }
  subHealth(clickValue) { this.health -= clickValue; }

  get money() { return this._money; }
  set money(value) { this._money = value; }
  incMoney(clickValue) { this.money += clickValue; }
  subMoney(clickValue) { this.money -= clickValue; }

  get awareness() { return this._awareness; }
  set awareness(value) { this._awareness = value; }
  incAwareness(clickValue) { this.awareness += clickValue; }
  subAwareness(clickValue) { this.awareness -= clickValue; }

  get karma() { return this._karma; }
  set karma(value) { this._karma = value; }
  incKarma(clickValue) { this.karma += clickValue; }
  subKarma(clickValue) { this.karma -= clickValue; }

  get location() { return this._location; }
  set location(value) { this._location = value; }
  setLocation(value) { this.location = value; }
}

// Initiate New User
const player = new User('Player');

// Time Saving Functions
function nodeVisToggle(toggleNode, className) {
  if (Array.isArray(toggleNode)) {
    for (let step = 0; step < toggleNode.length; step++) {
      document.getElementById(`${toggleNode[step]}`).classList.toggle(`${className}`);
    }
  } else {
    document.getElementById(`${toggleNode}`).classList.toggle(`${className}`);
  }
}

function nodeContent(selectedNode, content, animate, animation) {
  const element = document.querySelector(`#${selectedNode}`);
  function handleAnimationEnd() {
      element.classList.remove('animated', animation, 'faster');
      element.removeEventListener('animationend', handleAnimationEnd);
  }
  if (animate === true) {
    document.getElementById(selectedNode).innerHTML = `${content}`;
    element.classList.add('animated', animation, 'faster');
    element.addEventListener('animationend', handleAnimationEnd);
  } else {
    document.getElementById(selectedNode).innerHTML = `${content}`;
  }
}

// Click Functions
function introClick(clickValue){
  player.incHealth(clickValue);
  nodeContent('healthUILeveled', player.health, true, 'bounce');
  if (player.health === 2) {
    iziToast.show({
      title: 'Hey',
      message: 'You\'re still Alive?',
      position: 'topRight',
    });
  } else if (player.health === 5) {
    nodeContent('introButton', 'Cough');
  } else if (player.health === 6) {
    nodeContent('messageUI2', 'Your throat tightens painfully with each cough.', true, 'fadeIn');
  } else if (player.health === 7) {
    iziToast.show({
      title: 'Hmmm..',
      message: 'You should probably take it slow, you don\'t look so good.',
      position: 'topRight',
    });
  } else if (player.health === 8 || player.health === 9) {
    nodeContent('messageUI2', 'A particularly hard cough leaves blood on the pavement next to your face. You are acutely aware of how raw your throat is. ', true, 'fadeIn');
  } else if (player.health === 10 ) {
    nodeContent('introButton', 'Breathe');
    nodeContent('messageUI2', 'You realize you\'re laying on cold concrete, in an alley of some sort. Your head swims..', true, 'fadeIn');
  } else if ( player.health === 15) {
    let toggleNodeArray = ['introButton', 'findingHomeButton', 'map'];
    nodeVisToggle(toggleNodeArray, 'hidden');
    nodeContent('messageUI2', 'You sit up and try to remember what happened.. or to remember anything at all. What happened, Why am I here, who am I?!?', true, 'fadeIn');
    nodeContent('healthUILeveled', player.health, true, 'bounce');
    nodeContent('moneyUILeveled', player.money, true, 'bounce');
    nodeContent('awarenessUILeveled', player.awareness, true, 'bounce');
    nodeContent('karmaUILeveled', player.karma, true, 'bounce');
    nodeContent('locationUILeveled', player.location, true, 'bounce');
    createMap(1);
    return createPlayer(36, 20);
  }
}

function findingHomeClick(clickValue){
  if (player.awareness <= 16) {
    nodeContent('messageUI2', 'You make your way slowly down the alley');
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap(1);
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if ( player.awareness >= 17 && player.awareness <= 20) {
    player.setLocation('The City');
    nodeContent('messageUI2', 'After limping to the end of the alley you\'ve made it to an unfamiliar street. Where to now?');
    nodeContent('locationUILeveled', player.location);
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap(1);
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if ( player.awareness === 24) {
    nodeContent('messageUI2', 'After limping to the end of the alley you\'ve made it to an unfamiliar street. Where to now?');
    deleteScripts();
    createMap(2);
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    createPlayer(yPosition, xPosition);
    let toggleNodeArray = ['findingHomeButton', 'goLeftButton', 'goRightButton'];
    return nodeVisToggle(toggleNodeArray, 'hidden');
  }
}

function goLeft() {
  player.setLocation('In front of a home');
  nodeContent('locationUILeveled', player.location);
  nodeContent('messageUI2', 'You head left, down the street. You begin to see some familiar buildings, so trusting your instincts you continue where feels most familiar. It isn\'t long before you find yourself in front of house that feels as if it must be home, even if you have no specific memories of living there.');
  let toggleNodeArray = ['map', 'goLeftButton', 'goRightButton', 'enterHomeButton'];
  return nodeVisToggle(toggleNodeArray, 'hidden');
}

function goRight(){
  player.setLocation('In front of a home.');
  nodeContent('locationUILeveled', player.location);
  nodeContent('messageUI2', 'You head right, down the street. You begin to see some familiar buildings, so trusting your instincts you continue where feels most familiar. It isn\'t long before you find yourself in front of house that feels as if it must be home, even if you have no specific memories of living there.');
  let toggleNodeArray = ['map', 'goLeftButton', 'goRightButton', 'enterHomeButton'];
  return nodeVisToggle(toggleNodeArray, 'hidden');
}

function enterHome(){
  player.setLocation('Home');
  nodeContent('locationUILeveled', player.location);
  nodeContent('messageUI2', 'You enter your home, and as the wave of adrenalin leaves you, you pass out on the floor');
  nodeVisToggle(['enterHomeButton'], 'hidden');
  return clockState = setInterval(healthTimer, 1000);
}

function createCharacter(){
  window.location.href = "http://192.168.1.104:5420/users/register";
}

// Map Script
function createMap(stages) {
  if (document.getElementById('mapBase')){
    document.getElementById('mapBase').remove();
  }
  const magicMapBase = document.createElement('script');
  magicMapBase.type = 'text/javascript';
  magicMapBase.id = 'mapBase';
  let magicMapHeader = `const rc = rough.canvas(document.getElementById('canvas'));

`;
  let magicMapPlaces = `// Map Below
rc.rectangle(70, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
rc.rectangle(10, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
rc.rectangle(10, 0, 70, 10, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});

`;
  let magicMapStageTwoHeader = `const ac = rough.canvas(document.getElementById('canvas'));

`;
  let magicMapStageTwo = `// Map Below
  //alley
  ac.rectangle(70, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
ac.rectangle(10, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
ac.rectangle(10, 0, 70, 10, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
// end alley
// Lower left
ac.rectangle(0, 100, 10, 10, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});

// Lower Right horizontal street
ac.rectangle(70, 100, 1000, 10, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});

`;
  if (stages === 1) {
    try {
      magicMapBase.appendChild(document.createTextNode(magicMapHeader));
      magicMapBase.appendChild(document.createTextNode(magicMapPlaces));
      document.body.appendChild(magicMapBase);
    } catch (err) {
      magicMapBase.text = magicMapHeader + magicMapPlaces;
      document.body.appendChild(magicMapBase);
    }
  } else if (stages === 2) {
    try {
      magicMapBase.appendChild(document.createTextNode(magicMapStageTwoHeader));
      magicMapBase.appendChild(document.createTextNode(magicMapStageTwo));
      document.body.appendChild(magicMapBase);
    } catch (err) {
      magicMapBase.text = magicMapStageTwoHeader + magicMapStageTwo;
      document.body.appendChild(magicMapBase);
    }
  }
}

// Redraw Map Script
function redrawMap() {
  if (document.getElementById('mapRedraw')){
    document.getElementById('mapRedraw').remove();
  }
  const magicMapRedraw = document.createElement('script');
  magicMapRedraw.type = 'text/javascript';
  magicMapRedraw.id = 'mapRedraw';

  let magicMapPlaces = `// Map Below
rc.rectangle(70, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
rc.rectangle(10, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
rc.rectangle(10, 0, 70, 10, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});

`;
  try {
    magicMapRedraw.appendChild(document.createTextNode(magicMapPlaces));
    document.body.appendChild(magicMapRedraw);
  } catch(err) {
    magicMapRedraw.text = magicMapPlaces;
    document.body.appendChild(magicMapRedraw);
  }
}

// Draw Player Script
function createPlayer(yPosition, xPosition) {
  // Map Script - Player Icon
  if (document.getElementById('mapPlayerScript')){
    document.getElementById('mapPlayerScript').remove();
  }
  const magicMapPlayer = document.createElement('script');
  magicMapPlayer.type = 'text/javascript';
  magicMapPlayer.id = 'mapPlayerScript';
  let mapPlayer = `
rc.circle(${yPosition}, ${xPosition}, 20, {
  fill: "rgb(10, 150, 10)",
  fillWeight: 1,
  fillStyle: 'cross-hatch',
  roughness: 2
});`;
  try {
    magicMapPlayer.appendChild(document.createTextNode(mapPlayer));
    document.body.appendChild(magicMapPlayer);
  } catch(err) {
    magicMapPlayer.text = mapPlayer;
    document.body.appendChild(magicMapPlayer);
  }
}

// Clear Canvas Script
function clearCanvas() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Delete All Scripts
function deleteScripts() {
  clearCanvas();
  if (document.getElementById('mapBase')){
    document.getElementById('mapBase').remove();
  }
  if (document.getElementById('mapRedraw')){
    document.getElementById('mapRedraw').remove();
  }
  if (document.getElementById('mapPlayerScript')){
    document.getElementById('mapPlayerScript').remove();
  }
}

function healthTimer() {
  if (player.health >= 100) {
    nodeContent('messageUI2', 'In your sleep you hear whispers from something. You strain to hear what they are saying but you can\'t quite make it out. Suddenly, a loud voice says "Are you ready to begin? We will need some information from your first.."');
    nodeVisToggle(['createCharacterButton'], 'hidden');
    stopTimer(clockState);
  } else if (player.health < 100) {
    player.incHealth(5);
    nodeContent('healthUILeveled', player.health, true, 'bounce');
  }
}

function stopTimer(timerToStop) {
  clearInterval(timerToStop);
}