import {µ} from './env.mjs';

// Map Script
export const createMap = (stages) => {
  if (µ('mapBase')){ µ('#mapBase').remove(); }
  const magicMapBase = document.createElement('script');
  magicMapBase.type = 'text/javascript';
  magicMapBase.id = 'mapBase';
  const magicMapHeader = `const rc = rough.canvas(document.getElementById('canvas'));

`;
  const magicMapPlaces = `// Map Below
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
  const magicMapStageTwoHeader = `const ac = rough.canvas(document.getElementById('canvas'));

`;
  const magicMapStageTwo = `// Map Below
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
};

// Redraw Map Script
export const redrawMap = () => {
  if (µ('#mapRedraw')){ µ('mapRedraw').remove(); }
  const magicMapRedraw = document.createElement('script');
  magicMapRedraw.type = 'text/javascript';
  magicMapRedraw.id = 'mapRedraw';

  const magicMapPlaces = `// Map Below
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
  } catch (err) {
    magicMapRedraw.text = magicMapPlaces;
    document.body.appendChild(magicMapRedraw);
  }
};

// Draw Player Script
export const createPlayer = (yPosition, xPosition) => {
  // Map Script - Player Icon
  if (µ('#mapPlayerScript')){ µ('mapPlayerScript').remove(); }
  const magicMapPlayer = document.createElement('script');
  magicMapPlayer.type = 'text/javascript';
  magicMapPlayer.id = 'mapPlayerScript';
  const mapPlayer = `
rc.circle(${yPosition}, ${xPosition}, 20, {
  fill: "rgb(10, 150, 10)",
  fillWeight: 1,
  fillStyle: 'cross-hatch',
  roughness: 2
});`;
  try {
    magicMapPlayer.appendChild(document.createTextNode(mapPlayer));
    document.body.appendChild(magicMapPlayer);
  } catch (err) {
    magicMapPlayer.text = mapPlayer;
    document.body.appendChild(magicMapPlayer);
  }
};

// Clear Canvas Script
export const clearCanvas = () => {
  const canvas = µ('#canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
};

// Delete All Scripts
export const deleteScripts = () => {
  clearCanvas();
  if (µ('#mapBase')){ µ('#mapBase').remove(); }
  if (µ('#mapRedraw')){ µ('#mapRedraw').remove(); }
  if (µ('#mapPlayerScript')){ µ('#mapPlayerScript').remove(); }
};
export default {createMap, clearCanvas, createPlayer, deleteScripts, redrawMap};
