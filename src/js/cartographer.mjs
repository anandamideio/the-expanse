import interact from 'interactjs';
import rough from '../../node_modules/roughjs/dist/rough-async.umd';
const tiles = document.querySelectorAll('.mapTile');
const canvas = rough.canvas(document.getElementById('mapPort'), { workerURL: '../worker.js' });
const cell = { // .................>-The walls are represented in the order: [top, right, bottom, left]->
  Nxxx: [1,0,0,0], xExx: [0,1,0,0], xxSx: [0,0,1,0], xxxW: [0,0,0,1], // /_______________<-Single walls-<
  NExx: [1,1,0,0], NxxW: [1,0,0,1], xESx: [0,1,1,0], xxSW: [0,0,1,1], // /____________________<-Corners-<
  NESx: [1,1,1,0], NExW: [1,1,0,1], NxSW: [1,0,1,1], xESW: [0,1,1,1], // /___________________<-DeadEnds-<
  NxSx: [1,0,1,0], xExW: [0,1,0,1], NESW: [1,1,1,1], xxxx: [0,0,0,0], // /__<-Corridors, Block, & Empty-<
};
const mapTemplate = [
  [cell.xxxx,cell.NESx,cell.xxxx,cell.xExW,cell.xxxx,cell.NESW], // ///////////////////////////
  [cell.NxSW,cell.xxxx,cell.NxSx,cell.xxxx,cell.NxSx,cell.NxSx], // This is where you can play with the map
  [cell.xxxx,cell.xExW,cell.xxxx,cell.xExW,cell.xxxx,cell.NESW], // You define a square array of cell
  [cell.xxxW,cell.xxxx,cell.NxSx,cell.xxxx,cell.NxSx,cell.NxSx], // definitions
  [cell.xxxx,cell.xExW,cell.xxxx,cell.xESW,cell.NESW,cell.xxxW], //
  [cell.xxxx,cell.xExW,cell.xxxx,cell.NExW,cell.NESW,cell.Nxxx], //
];
const mapSize = 600,
  borderWidth = 20,
  portSize = mapSize + borderWidth,
  cellWidth = mapSize/mapTemplate.length,
  position = { x:0, y:0 };
canvas.rectangle(10, 10, portSize, portSize); // ................................................<-A simple border-<

const drawCell = function(xLocation, yLocation, cell) {
  const
    xCoordinateLow = borderWidth + (cellWidth * xLocation),
    xCoordinateHigh = borderWidth + (cellWidth * xLocation) + cellWidth,
    yCoordinateLow = borderWidth + (cellWidth * yLocation),
    yCoordinateHigh = borderWidth + (cellWidth * yLocation) + cellWidth;
  const lines = [
    {p1: xCoordinateLow, p2: yCoordinateLow, p3: xCoordinateHigh, p4: yCoordinateLow}, // .............<-top-<
    {p1: xCoordinateLow, p2: yCoordinateLow, p3: xCoordinateLow, p4: yCoordinateHigh}, // ...........<-right-<
    {p1: xCoordinateLow, p2: yCoordinateHigh, p3: xCoordinateHigh, p4: yCoordinateHigh}, //.........<-bottom-<
    {p1: xCoordinateHigh, p2: yCoordinateLow, p3: xCoordinateHigh, p4: yCoordinateHigh}, // ..........<-left-<
  ];

  const newTile = document.createElement("div"),
    tileContent = document.createTextNode(`${xLocation}:${yLocation} - ${cell}°Ð`),
    parentPort = document.getElementById('mapDisplay');
  newTile.appendChild(tileContent);
  newTile.setAttribute("class", "mapTile draggable");
  newTile.setAttribute("id", `${xLocation}-${yLocation}`);
  newTile.setAttribute("style", `height:${cellWidth}px; width:${cellWidth}px; top:${xCoordinateLow}px; left:${yCoordinateLow}px;`);
  parentPort.append(newTile);

  cell.forEach((wall, index) => {
    if(wall === 1) {
      return canvas.line(lines[index].p1, lines[index].p2, lines[index].p3, lines[index].p4)
    }
  })
};

mapTemplate.forEach((row, yIter) => {
  row.forEach((cell, xIter) => {
    drawCell(xIter, yIter, cell);
  })
});

interact('.draggable').draggable({
  listeners: {
    start (event) {
      console.log(event.type, event.target)
    },
    move (event) {
      position.x += event.dx;
      position.y += event.dy;

      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
    },
  },
  cursorChecker: (action, interatable, element, interacting) => {
    switch (action.axis) {
      case 'x': return 'ew-resize';
      case 'y': return 'ns-resize';
      default: return interacting ? 'grabbing' : 'grab'
    }
  }
});
