import interact from 'interactjs';
import rough from '../../node_modules/roughjs/dist/rough-async.umd';
const tiles = document.querySelectorAll('.mapTile');
const canvas = rough.canvas(document.getElementById('mapPort'), { workerURL: './worker.js' });
const cell = { // .................>-The walls are represented in the order: [top, right, bottom, left]->
  Nxxx: [1,0,0,0], xExx: [0,1,0,0], xxSx: [0,0,1,0], xxxW: [0,0,0,1], // /_______________<-Single walls-<
  NExx: [1,1,0,0], NxxW: [1,0,0,1], xESx: [0,1,1,0], xxSW: [0,0,1,1], // /____________________<-Corners-<
  NESx: [1,1,1,0], NExW: [1,1,0,1], NxSW: [1,0,1,1], xESW: [0,1,1,1], // /___________________<-DeadEnds-<
  NxSx: [1,0,1,0], xExW: [0,1,0,1], NESW: [1,1,1,1], xxxx: [0,0,0,0], // /__<-Corridors, Block, & Empty-<
};
const mapTemplate = [
  ['xxxx','Nxxx','xxxx','xExx','xxxx','xxSx','xxxx','xxxW'], // ///////////////////////////
  ['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx'], // This is where you can play with the map
  ['NExx','xxxx','NxxW','xxxx','xESx','xxxx','xxSW','xxxx'], // You define a square array of cell
  ['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx'], // definitions
  ['xxxx','NESx','xxxx','NExW','xxxx','NxSW','xxxx','xESW'], //
  ['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx'],
  ['NxSx','xxxx','xExW','xxxx','NESW','xxxx','xxxx','xxxx'],
  ['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx','xxxx'], //
];
const mapSize = 600,
  borderWidth = 20,
  portSize = mapSize + borderWidth,
  cellWidth = mapSize/mapTemplate.length,
  position = { x:0, y:0 };
canvas.rectangle(10, 10, portSize, portSize); //<-< -------------------------------------- <-A simple border-<

const drawCell = function(yLocation, xLocation, tile) {
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

  const
    parentPort = document.getElementById('mapDisplay'),
    dropTile = document.createElement("div"),
    dragTile = document.createElement("div"),
    dropContent = document.createTextNode(`${xLocation}:${yLocation} - Ð`),
    dragContent = document.createTextNode(`${tile} - °`);

  dropTile.appendChild(dropContent);
  dropTile.setAttribute("class", "mapTile dropzone");
  dropTile.setAttribute("data-x", `${xLocation}`);
  dropTile.setAttribute("data-y", `${yLocation}`);
  dropTile.setAttribute("id", `${xLocation}-${yLocation}Ð`);
  dropTile.setAttribute("style", `height:${cellWidth}px; width:${cellWidth}px; top:${yCoordinateLow}px; left:${xCoordinateLow}px;`);
  parentPort.append(dropTile);

  dragTile.appendChild(dragContent);
  dragTile.setAttribute("class", "mapTile draggable");
  dragTile.setAttribute("data-x", `${xLocation}`);
  dragTile.setAttribute("data-y", `${yLocation}`);
  dragTile.setAttribute("id", `${xLocation}.${yLocation}°`);
  dragTile.setAttribute("style", `height:${cellWidth}px; width:${cellWidth}px; top:${yCoordinateLow}px; left:${xCoordinateLow}px;`);
  parentPort.append(dragTile);

  const tileDef = cell[`${tile}`];
  tileDef.forEach((wall, index) => {
    wall && canvas.line(lines[index].p1, lines[index].p2, lines[index].p3, lines[index].p4)
  })
};

let grabbedTile;

const drawMap = function(templateArray) {
  templateArray.forEach((row, yIter) => {
    row.forEach((cell, xIter) => {
      drawCell(yIter, xIter, cell);
    })
  })
};
const swapCells = function(dropZoneTile) {
  let ordX = dropZoneTile.dataset.x;
  let ordY = dropZoneTile.dataset.y;
  console.log(mapTemplate[ordY][ordX]);
  mapTemplate[ordY][ordX] = grabbedTile;
  console.log(mapTemplate[ordY][ordX]);
  drawMap(mapTemplate);
};

drawMap(mapTemplate);

interact('.draggable').draggable({
  listeners: {
    start (event) {
      let ordX = event.target.dataset.x;
      let ordY = event.target.dataset.y;
      grabbedTile = mapTemplate[ordY][ordX];
    },
    move (event) {
      position.x += event.dx;
      position.y += event.dy;

      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    },
  }
});

interact('.dropzone')
  .dropzone({ ondrop: e => swapCells(e.target) })
  .on('dropactivate', e => e.target.classList.add('drop-activated'));