import rough from '../../node_modules/roughjs/dist/rough-async.umd';
import interact from 'interactjs';
import FileSaver from 'file-saver';
import {Ω} from './modules/omega';
import {µ} from './modules/micro';

const
  mapGrid = document.getElementById('mapGrid'),
  canvas = rough.canvas(document.getElementById('mapCanvas'), { workerURL: './worker.js' }),

  cell = { // .................>-The walls are represented in the order: [top, right, bottom, left]->
  Nxxx: [1,0,0,0], xExx: [0,1,0,0], xxSx: [0,0,1,0], xxxW: [0,0,0,1],  // /_______________<-Single walls-<
  NExx: [1,1,0,0], NxxW: [1,0,0,1], xESx: [0,1,1,0], xxSW: [0,0,1,1],  // /____________________<-Corners-<
  NESx: [1,1,1,0], NExW: [1,1,0,1], NxSW: [1,0,1,1], xESW: [0,1,1,1],  // /___________________<-DeadEnds-<
  NESW: [1,1,1,1], NxSx: [1,0,1,0], xExW: [0,1,0,1], xxxx: [0,0,0,0]}, // /__<-Corridors, Block, & Empty-<

  // No idea I think this translates the thing above? Or vice-versa??
  editPalette = [
  ['Nxxx','xExx','xxSx','xxxW'],
  ['NExx','NxxW','xESx','xxSW'],
  ['NESx','NExW','NxSW','xESW'],
  ['NESW','NxSx','xExW','xxxx']],

  // Map Size Variables
  mapSize = 600,
  borderWidth = 20,
  borderOffset = 10,
  portSize = mapSize + borderWidth;

let cellWidth, mapTemplate;

  // ///////////////////// //
  // Tile <div> Generators
  //
const createDrop = function(yLocation, xLocation, yCoordinateLow, xCoordinateLow){
    Ω('div', `x${xLocation}-y${yLocation}`, 'mapGrid');
    µ(`#x${xLocation}-y${yLocation}`)
      .textChild(`${xLocation}:${yLocation}`)
      .set({
      "class": "mapTile dropzone",
      "data-x": `${xLocation}`,
      "data-y": `${yLocation}`,
      "style": `height:${cellWidth}px; width:${cellWidth}px; top:${yCoordinateLow}px; left:${xCoordinateLow}px;`});
  };

const createDrag = function(yLocation, xLocation, yCoordinateLow, xCoordinateLow, edit) {
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
    dragTile.setAttribute("id", `x${xLocation}_y${yLocation}°`);
    dragTile.setAttribute("style", `height:${cellWidth}px; width:${cellWidth}px; top:${yCoordinateLow}px; left:${xCoordinateLow}px;`);
    mapGrid.append(dragTile);
  };

  // ///////////////// //
  // Drawing Functions
  //
const drawCell = function(yLocation, xLocation, tile) {
    const
      xCoordinateLow = borderWidth + (cellWidth * xLocation),
      xCoordinateHigh = borderWidth + (cellWidth * xLocation) + cellWidth,
      yCoordinateLow = borderWidth + (cellWidth * yLocation),
      yCoordinateHigh = borderWidth + (cellWidth * yLocation) + cellWidth,
      lines = [
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
  };

const drawPaletteCell = function(yLocation, xLocation, tile) {
    const
      editBorderOffset = portSize + (3 * borderOffset),
      editCellWidth = cellWidth + 20,
      xCoordinateLow = borderWidth + (cellWidth * xLocation) + (portSize + (2 * borderOffset)) + (borderWidth * xLocation),
      yCoordinateLow = borderWidth + (cellWidth * yLocation) + (borderWidth * yLocation),
      xCoordinateHigh = borderWidth + (cellWidth * xLocation) + cellWidth + (portSize +(2 * borderOffset)) + (borderWidth * xLocation),
      yCoordinateHigh = borderWidth + (cellWidth * yLocation) + cellWidth + (borderWidth * yLocation),
      lines = [
      {p1: xCoordinateLow, p2: yCoordinateLow, p3: xCoordinateHigh, p4: yCoordinateLow}, //<-< -------- <-top-<
      {p1: xCoordinateHigh, p2: yCoordinateLow, p3: xCoordinateHigh, p4: yCoordinateHigh},//<-< ------- <-right-<
      {p1: xCoordinateLow, p2: yCoordinateHigh, p3: xCoordinateHigh, p4: yCoordinateHigh}, //<-< ------ <-bottom-<
      {p1: xCoordinateLow, p2: yCoordinateLow, p3: xCoordinateLow, p4: yCoordinateHigh}, //<-< -------- <-left-<
    ];

    createDrag(yLocation, xLocation, yCoordinateLow, xCoordinateLow, 'edit');
    canvas.rectangle((yLocation * editCellWidth) + editBorderOffset, (xLocation * editCellWidth)+ borderOffset, editCellWidth, editCellWidth);
    cell[`${tile}`].forEach((wall, index) => { wall && canvas.line(lines[index].p1, lines[index].p2, lines[index].p3, lines[index].p4)})
  };

const drawMap = (template) => {
    let child = mapGrid.lastElementChild; //                                                      Kill all children nodes of the global mapGrid var
    while (child) {
      mapGrid.removeChild(child); //                                                      Kill the child
      child = mapGrid.lastElementChild; //                                                        Assign the next child
    }
    //                                                                                            Clear the canvas, create a new canvas
    document.getElementById('mapCanvas').getContext('2d').clearRect(5, 5, 1200, 1200);
    cellWidth = mapSize/template.length; //                                                       Makes the cells that compose the grid dynamic
    editPalette.forEach((row, yIter) => { //                                                      Makes the cell-choice palette on the right-hand side of the screen
      row.forEach((cell, xIter) => { drawPaletteCell(yIter, xIter, cell) })
    });
    canvas.rectangle(borderOffset, borderOffset, portSize, portSize); // <-< -------------- <-    A simple border-<
    template.forEach((row, yIter) => { //                                                         Makes the main map grid
      row.forEach((cell, xIter) => { drawCell(yIter, xIter, cell); })
    });
  };

const defineGrid = () => { //                                                                         Define the inital grid that all cells will be placed upon
    const gridTemplate = [], renderedGrid = []; let renderHeight = 0;
    let gridSize = parseInt(document.getElementById('gridSize').value, 10); // Read the gridSize input under the map
    if (gridSize < 6 && gridSize > 0){ gridSize = 6;} //                                          Don't accept a value below 6
    gridTemplate.length = gridSize || 8; //                                                       8 is the initial length of squares across
    gridTemplate.fill('xxxx'); //                                                           For no initial grid use the setting: xxxx, for a grid use the value: NESW
    while (renderHeight < gridTemplate.length) { //                                               Render a grid by parsing the gridTemplate for each cell
      renderedGrid.push([...gridTemplate]);
      renderHeight += 1;
    }
    mapTemplate = renderedGrid; //                                                                Assigns to the global mapTemplate variable
    drawMap(mapTemplate);
  };

  // ///////////// //
  // Draw Listener
document.getElementById('submitSize').addEventListener('click', defineGrid);

  // ///////////////////// //
  // Drag & Drop Functions
  //
let grabbedTile, origin, oldX, oldY, newX, newY;

const grabCell = function(grabbed){
    origin = grabbed.dataset.origin;
    oldX = grabbed.dataset.x;
    oldY = grabbed.dataset.y;
    console.log(origin);
    if (origin === 'fromPalette') { grabbedTile = editPalette[oldY][oldX] }
    else if (origin === 'fromMap') { grabbedTile = mapTemplate[oldY][oldX] }
  };

const swapCells = function(dropZoneTile) {
    newX = dropZoneTile.dataset.x;
    newY = dropZoneTile.dataset.y;
    if ( origin === 'fromMap'){ mapTemplate[oldY][oldX] = mapTemplate[newY][newX] }
    mapTemplate[newY][newX] = grabbedTile;
    grabbedTile = undefined;
    drawMap(mapTemplate);
  };

  // ///////////////////// //
  // Drag & Drop Listeners
interact('.draggable').draggable({ listeners: { start (e) { grabCell(e.target); } }});
interact('.dragEdit').draggable({ listeners: { start (e) { grabCell(e.target) } }});
interact('.dropzone').dropzone({ ondrop: e => swapCells(e.target) });

  // /////////// //
  // Save & Load
  //
const
  submitSave = document.getElementById('submitSave'),
  loadButton = document.getElementById('loadButton'),
  loadPortal = document.getElementById('loadPortal'),
  closeModal = document.getElementById('closeModal'),
  loadDropIn = document.getElementById('loadDropIn');

const save = function() {
    const mapSaveObj = {
      name: document.getElementById('mapSaveName').value,
      layout: mapTemplate,
    };
    const blobbedMap = new Blob([JSON.stringify(mapSaveObj)], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blobbedMap, `mapSave-${mapSaveObj.name}.txt`);
  };

const handleDrop = function(e) {
    if (e.dataTransfer.files.length > 1) return console.error('Choose exactly one file to load');

    const
      [...file] = e.dataTransfer.files,
      mapToLoad = file[0],
      mapReader = new FileReader();

    mapReader.readAsText(mapToLoad);
    mapReader.onload = ()=>{
      const loadedFile = JSON.parse((mapReader.result).toString());
      console.log(loadedFile.layout);
      mapTemplate = loadedFile.layout;
      drawMap(mapTemplate);
      toggleLoadPortal();
    };
  };

const toggleLoadPortal = ()=>{ loadPortal.classList.toggle('is-active'); };
const lightsOn = ()=>{ loadPortal.classList.add('highlight') };
const lightOff = ()=>{ loadPortal.classList.remove('highlight') };
const preventDefaults = (e)=>{ e.preventDefault(); e.stopPropagation(); };

  // ///////////////////// //
  // Save & Load Listeners
submitSave.addEventListener('click', save);
[loadButton, closeModal].forEach(button => button.addEventListener('click', toggleLoadPortal));
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(e => loadDropIn.addEventListener(e, preventDefaults, false));
['dragenter', 'dragover'].forEach(e => loadDropIn.addEventListener(e, lightsOn, false));
['dragleave', 'drop'].forEach(e => loadDropIn.addEventListener(e, lightOff, false));
loadDropIn.addEventListener('drop', handleDrop, false);

  // ////////// //
  // Initialize
defineGrid();
