import interact from 'interactjs';
import rough from '../../node_modules/roughjs/dist/rough-async.umd';
const
  mapDisplay = document.getElementById('mapDisplay'),
  canvas = rough.canvas(document.getElementById('mapPort'), { workerURL: './worker.js' }),
  smoothCanvas = document.getElementById('mapPort'),
  context = smoothCanvas.getContext('2d'),
  parentPort = document.getElementById('mapDisplay');
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
let mapTemplate = [
  ['xxxx','Nxxx','xxxx','xExx','xxxx','xxSx','xxxx','xxxW'], // ///////////////////////////
  ['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx'], // This is where you can play with the map
  ['NExx','xxxx','NxxW','xxxx','xESx','xxxx','xxSW','xxxx'], // You define a square array of cell
  ['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx'], // definitions
  ['xxxx','NESx','xxxx','NExW','xxxx','NxSW','xxxx','xESW'], //
  ['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx'],
  ['NxSx','xxxx','xExW','xxxx','NESW','xxxx','xxxx','xxxx'],
  ['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx'], //
];

const
  zmapTemplate = [],
  sizeControl = document.getElementById('submitSize'),
  sizeInput = document.getElementById('sizeControl');
let sizeValue = parseInt(sizeInput.value, 10);

const
  defineGrid = function() {
    const lineTemplate = [];
    console.log(parseInt(sizeInput.value, 10));
    lineTemplate.length = parseInt(sizeInput.value, 10);
    mapTemplate.length = parseInt(sizeInput.value, 10);
    lineTemplate.fill('xxxx');
    mapTemplate.fill(lineTemplate);
    redrawMap(mapTemplate);
  };

sizeControl.addEventListener('click', defineGrid);

const
  mapSize = 600,
  borderWidth = 20,
  borderOffset = 10,
  portSize = mapSize + borderWidth,
  cellWidth = mapSize/mapTemplate.length;

  // ///////////////////
  // Drawing Functions
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
    parentPort.append(dropTile);
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
    parentPort.append(dragTile);
  },

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
    canvas.rectangle(borderOffset, borderOffset, portSize, portSize); //<-< -------------------------------------- <-A simple border-<
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

  redrawMap = function() {
    deleteChildren(mapDisplay);
    context.clearRect(5, 5, 1200, 1200);
    drawPalette();
    drawMap(mapTemplate);
  };

  // ///////////////////////// //
  // Drag & Drop Functionality //
  //
let grabbedTile, origin, oldX, oldY, newX, newY;
const
  grabCell = function(grabbed){
    origin = grabbed.dataset.origin;
    oldX = grabbed.dataset.x;
    oldY = grabbed.dataset.y;
    console.log(origin);
    if (origin === 'fromPalette'){ grabbedTile = editPalette[oldY][oldX] }
    else if (origin === 'fromMap') {grabbedTile = mapTemplate[oldY][oldX];}
  },

  swapCells = function(dropZoneTile) {
    newX = dropZoneTile.dataset.x;
    newY = dropZoneTile.dataset.y;
    if ( origin === 'fromMap'){ mapTemplate[oldY][oldX] = mapTemplate[newY][newX] }
    mapTemplate[newY][newX] = grabbedTile;
    grabbedTile = undefined;
    redrawMap();
  };

interact('.draggable').draggable({
  listeners: { start (e) { grabCell(e.target); } }
});
interact('.dragEdit').draggable({
  listeners: { start (e) { grabCell(e.target) } }
});
interact('.dropzone')
  .dropzone({ ondrop: e => swapCells(e.target) });

redrawMap();
//window.setInterval(redrawMap, 1000/5); // <<=This is just for fun=<<
