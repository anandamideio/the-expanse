import rough from '../../node_modules/roughjs/dist/rough-async.umd';
import interact from 'interactjs';
import FileSaver from 'file-saver';

const
  submitSize = document.getElementById('submitSize'),
  mapDisplay = document.getElementById('mapDisplay'),
  canvas = rough.canvas(document.getElementById('mapPort'), { workerURL: './worker.js' }),
  smoothCanvas = document.getElementById('mapPort'),
  context = smoothCanvas.getContext('2d');
const cell = { // .................>-The walls are represented in the order: [top, right, bottom, left]->
  Nxxx: [1,0,0,0], xExx: [0,1,0,0], xxSx: [0,0,1,0], xxxW: [0,0,0,1], // /_______________<-Single walls-<
  NExx: [1,1,0,0], NxxW: [1,0,0,1], xESx: [0,1,1,0], xxSW: [0,0,1,1], // /____________________<-Corners-<
  NESx: [1,1,1,0], NExW: [1,1,0,1], NxSW: [1,0,1,1], xESW: [0,1,1,1], // /___________________<-DeadEnds-<
  NESW: [1,1,1,1], NxSx: [1,0,1,0], xExW: [0,1,0,1], xxxx: [0,0,0,0], // /__<-Corridors, Block, & Empty-<
};
const editPalette = [
  ['Nxxx','xExx','xxSx','xxxW'],
  ['NExx','NxxW','xESx','xxSW'],
  ['NESx','NExW','NxSW','xESW'],
  ['NESW','NxSx','xExW','xxxx'],
];

const
  mapSize = 600,
  borderWidth = 20,
  borderOffset = 10,
  portSize = mapSize + borderWidth;
let cellWidth, mapTemplate;
// ///////////////////// //
// Tile <div> Generators
//
const
  createDrop = function(yLocation, xLocation, yCoordinateLow, xCoordinateLow){
    const
      dropContent = document.createTextNode(`${xLocation}:${yLocation} - Ð`),
      dropTile = document.createElement("div");
    dropTile.appendChild(dropContent);
    dropTile.setAttribute("class", "mapTile dropzone");
    dropTile.setAttribute("data-x", `${xLocation}`);
    dropTile.setAttribute("data-y", `${yLocation}`);
    dropTile.setAttribute("id", `${xLocation}-${yLocation}Ð`);
    dropTile.setAttribute("style", `height:${cellWidth}px; width:${cellWidth}px; top:${yCoordinateLow}px; left:${xCoordinateLow}px;`);
    mapDisplay.append(dropTile);
  },

  createDrag = function(yLocation, xLocation, yCoordinateLow, xCoordinateLow, edit) {
    const
      dragContent = document.createTextNode(`${mapTemplate[yLocation][xLocation]} - °`),
      dragTile = document.createElement("div");
    dragTile.appendChild(dragContent);
    if (edit) {
      dragTile.setAttribute("class", "mapTile dragEdit");
      dragTile.setAttribute("data-origin", "fromPalette");
    } else {
      dragTile.setAttribute("class", "mapTile draggable");
      dragTile.setAttribute("data-origin", "fromMap");
    }
    dragTile.setAttribute("data-x", `${xLocation}`);
    dragTile.setAttribute("data-y", `${yLocation}`);
    dragTile.setAttribute("id", `${xLocation}.${yLocation}°`);
    dragTile.setAttribute("style", `height:${cellWidth}px; width:${cellWidth}px; top:${yCoordinateLow}px; left:${xCoordinateLow}px;`);
    mapDisplay.append(dragTile);
  };
// ///////////////// //
// Drawing Functions
//
const
  drawCell = function(yLocation, xLocation, tile) {
    const
      xCoordinateLow = borderWidth + (cellWidth * xLocation),
      xCoordinateHigh = borderWidth + (cellWidth * xLocation) + cellWidth,
      yCoordinateLow = borderWidth + (cellWidth * yLocation),
      yCoordinateHigh = borderWidth + (cellWidth * yLocation) + cellWidth;
    const lines = [
      {p1: xCoordinateLow, p2: yCoordinateLow, p3: xCoordinateHigh, p4: yCoordinateLow}, //<-< --------- <-top-<
      {p1: xCoordinateHigh, p2: yCoordinateLow, p3: xCoordinateHigh, p4: yCoordinateHigh},//<-< ------ <-right-<
      {p1: xCoordinateLow, p2: yCoordinateHigh, p3: xCoordinateHigh, p4: yCoordinateHigh}, //<-< ---- <-bottom-<
      {p1: xCoordinateLow, p2: yCoordinateLow, p3: xCoordinateLow, p4: yCoordinateHigh}, //<-< -------- <-left-<
    ];

    createDrop(yLocation, xLocation, yCoordinateLow, xCoordinateLow);
    createDrag(yLocation, xLocation, yCoordinateLow, xCoordinateLow);

    cell[`${tile}`].forEach((wall, index) => {
      wall && canvas.line(lines[index].p1, lines[index].p2, lines[index].p3, lines[index].p4)
    })
  },

  drawMap = function(templateArray) {
    canvas.rectangle(borderOffset, borderOffset, portSize, portSize); // <-< -------------- <-A simple border-<
    templateArray.forEach((row, yIter) => {
      row.forEach((cell, xIter) => {
        drawCell(yIter, xIter, cell);
      })
    });
  },

  drawPaletteCell = function(yLocation, xLocation, tile) {
    const
      editBorderOffset = portSize+(3*borderOffset),
      editCellWidth = cellWidth+20;
    const
      xCoordinateLow = borderWidth + (cellWidth * xLocation) + (portSize+(2*borderOffset)) + (borderWidth*xLocation),
      yCoordinateLow = borderWidth + (cellWidth * yLocation) + (borderWidth*yLocation),
      xCoordinateHigh = borderWidth + (cellWidth * xLocation) + cellWidth + (portSize+(2*borderOffset)) + (borderWidth*xLocation),
      yCoordinateHigh = borderWidth + (cellWidth * yLocation) + cellWidth + (borderWidth*yLocation);
    const lines = [
      {p1: xCoordinateLow, p2: yCoordinateLow, p3: xCoordinateHigh, p4: yCoordinateLow}, //<-< --------- <-top-<
      {p1: xCoordinateHigh, p2: yCoordinateLow, p3: xCoordinateHigh, p4: yCoordinateHigh},//<-< ------ <-right-<
      {p1: xCoordinateLow, p2: yCoordinateHigh, p3: xCoordinateHigh, p4: yCoordinateHigh}, //<-< ---- <-bottom-<
      {p1: xCoordinateLow, p2: yCoordinateLow, p3: xCoordinateLow, p4: yCoordinateHigh}, //<-< -------- <-left-<
    ];
    createDrag(yLocation, xLocation, yCoordinateLow, xCoordinateLow, 'edit');
    canvas.rectangle((yLocation * editCellWidth)+editBorderOffset, (xLocation * editCellWidth)+borderOffset, editCellWidth, editCellWidth);
    cell[`${tile}`].forEach((wall, index) => {
      wall && canvas.line(lines[index].p1, lines[index].p2, lines[index].p3, lines[index].p4)
    })
  },

  drawPalette = function(){
    editPalette.forEach((row, yIter) => {
      row.forEach((cell, xIter) => {
        drawPaletteCell(yIter, xIter, cell)
      })
    });
  },

  deleteChildren = function(parent) {
    let child = parent.lastElementChild;
    while(child){
      parent.removeChild(child);
      child = parent.lastElementChild;
    }
  },

  redrawMap = function(template) {
    deleteChildren(mapDisplay);
    context.clearRect(5, 5, 1200, 1200);
    cellWidth = mapSize/template.length;
    drawPalette();
    drawMap(template);
  },

  defineGrid = function() {
    const
      lineTemplate = [],
      sizeInput = document.getElementById('sizeControl');
    lineTemplate.length = parseInt(sizeInput.value, 10) || 8;
    lineTemplate.fill('NESW');
    let emptyTemplate = [], mapHeight = 0;
    while (mapHeight < lineTemplate.length) {
      const line = [...lineTemplate];
      emptyTemplate.push(line);
      mapHeight += 1;
    }
    mapTemplate = emptyTemplate;
    redrawMap(mapTemplate);
  };
// ///////////// //
// Draw Listener
submitSize.addEventListener('click', defineGrid);


// ///////////////////// //
// Drag & Drop Functions
//
let grabbedTile, origin, oldX, oldY, newX, newY;
const
  grabCell = function(grabbed){
    origin = grabbed.dataset.origin;
    oldX = grabbed.dataset.x;
    oldY = grabbed.dataset.y;
    console.log(origin);
    if (origin === 'fromPalette') { grabbedTile = editPalette[oldY][oldX] }
    else if (origin === 'fromMap') { grabbedTile = mapTemplate[oldY][oldX] }
  },

  swapCells = function(dropZoneTile) {
    newX = dropZoneTile.dataset.x;
    newY = dropZoneTile.dataset.y;
    if ( origin === 'fromMap'){ mapTemplate[oldY][oldX] = mapTemplate[newY][newX] }
    mapTemplate[newY][newX] = grabbedTile;
    grabbedTile = undefined;
    redrawMap(mapTemplate);
  };
// ///////////////////// //
// Drag & Drop Listeners
interact('.draggable').draggable({
  listeners: { start (e) { grabCell(e.target); } }
});
interact('.dragEdit').draggable({
  listeners: { start (e) { grabCell(e.target) } }
});
interact('.dropzone')
  .dropzone({ ondrop: e => swapCells(e.target) });

  // /////////// //
  // Save & Load
  //
const
  submitSave = document.getElementById('submitSave'),
  loadButton = document.getElementById('loadButton'),
  loadPortal = document.getElementById('loadPortal');
const
  save = function() {
    const mapSaveObj = {
      name: document.getElementById('mapSaveName').value,
      layout: mapTemplate,
    };
    const blobbedMap = new Blob([JSON.stringify(mapSaveObj)], {type: 'application/json;charset=utf-8'});
    FileSaver.saveAs(blobbedMap, `mapSave-${mapSaveObj.name}.JSON`);
  },

  activateLoadPortal = function() {
    loadPortal.classList.toggle('is-active');
  },

  load = function() {
  };
  // ///////////////////// //
  // Save & Load Listeners
submitSave.addEventListener('click', save);
loadButton.addEventListener('click', activateLoadPortal);

defineGrid();
//window.setInterval(redrawMap, 1000/5); // <<=This is just for fun=<<
