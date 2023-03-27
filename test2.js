// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



const form = document.querySelector('form'),
      errorMessage = document.getElementById("errorMessage"),
      download = document.getElementById("download-btn");
const X = 0, Y = 1;
let centre = [],
    cirHeights = [],
    scale = 20,
    angles = [0, 0]
    zeroCoord = [0 , 0];

let bustStart = [],
    waistStart = [],
    bustEnd = [],
    waistEnd = [];
let b = 81, w = 66, i = 18;

var tempMinX, tempMinY, tempMaxY;

window.onload = function () {
  
    ctx.font = "30px Arial";
    ctx.fillText("Generate Pattern!", 30, 50);
};



function drawPattern(e) {
  e.preventDefault();
  console.log("Hi");

  b = parseFloat(document.getElementById('Braw').value);
  w = parseFloat(document.getElementById('Wraw').value);
  i = parseFloat(document.getElementById('Iraw').value);

  console.log(b, w, i);

  if (isNaN(b) || isNaN(w) || isNaN(i)) {
    errorMessage.innerHTML = "Please enter numbers";

  } else if (b <= 0 || w <= 0 || i <= 0) {
    errorMessage.innerHTML = "Please enter positive measurements";

  } else if (b <= w || b-w <= 0.001) {
    errorMessage.innerHTML = "Bust value must be more than waist value (if bust is the same as waist, add 0.01 to bust)";

  } else {
    errorMessage.innerHTML = "";
    makePattern();
  }
}

function makePattern() {
    let tempX = 1000;
    let tempY = 400;
    zeroCoord = [tempX/2, 50];
  
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
  
    calculateShape();
    drawShape();
    resizeCanvas();
    makeFile();
}


function calculateShape() {
    // get all of the necessary points
    let bust = b/2;
    let waist = w/2;
    let inBetween = i;
  
    waistStart = [zeroCoord[X], zeroCoord[Y]];
    bustStart = [waistStart[X] + (inBetween*scale), waistStart[Y]];
  
    // draw line for B and W
    let wTemp = [waistStart[X], waistStart[Y] + (waist*scale)];
    let bTemp = [bustStart[X], bustStart[Y] + (bust*scale)];
  
    //find x-intercept for arc centre
    let m = (wTemp[Y]-bTemp[Y])/(wTemp[X]-bTemp[X]);
    centre = [(zeroCoord[Y]-bTemp[Y])/m + bTemp[X], zeroCoord[Y]];
  
    //find r of circle
    let radius = waistStart[X] - centre[X];
    angles[1] = (bust*scale)/radius;
  
    //diameter of circle
    cirHeights = [radius, (radius+inBetween*scale)];
  
    //final line
    bustEnd = [centre[X]+((radius+(inBetween*scale))*Math.cos(angles[1])), centre[Y]+((radius+(inBetween*scale))*Math.sin(angles[1]))];
    waistEnd = [centre[X] + (radius*Math.cos(angles[1])), centre[Y] + (radius*Math.sin(angles[1]))];
}

function resizeCanvas() {
    let min = [];
    let max = [];
  
    min[X] = Math.floor(Math.min(bustEnd[X], waistEnd[X], tempMinX));
    min[Y] = Math.floor(Math.min(bustEnd[Y], waistStart[Y], tempMinY));
  
    zeroCoord[X] = (waistStart[X] - min[X]) + 50;
    zeroCoord[Y] = (waistStart[Y] - min[Y]) + 50;
  
    calculateShape();
    drawShape();
  
    max[X] = bustStart[X];
    max[Y] = Math.max(bustEnd[Y], tempMaxY);
  
    tempX = Math.floor(max[X] + 50);
    tempY = Math.floor(max[Y] + 50);
  
    canvas.width = tempX;
    canvas.height = tempY;
    drawShape();
}


function drawShape() {

    // draw the grid
    ctx.lineWidth = 1;
    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(0, 0, tempX, 100);
    // ctx.stroke();
    ctx.strokeStyle = '#DCDCDC';

    for (let i = 0; i < canvas.width; i = i+scale) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i = i+scale) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // draw pattern
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
  
    ctx.beginPath();
    ctx.arc(centre[X], centre[Y], cirHeights[0], angles[0], angles[1]);
    ctx.stroke();
  
    ctx.moveTo(waistStart[X], waistStart[Y]);
    ctx.lineTo(bustStart[X], bustStart[Y]);
    ctx.stroke();
  
  
    ctx.beginPath();
    ctx.arc(centre[X], centre[Y], cirHeights[1], angles[0], angles[1]);
  
    if (ctx.isPointInPath(centre[X]-cirHeights[1], centre[Y])) tempMinX = centre[X]-cirHeights[1];
    else tempMinX = bustStart[X];
  
    if (ctx.isPointInPath(centre[X], centre[Y]-cirHeights[1])) tempMinY = centre[Y]-cirHeights[1];
    else tempMinY = bustStart[Y];
  
    if (ctx.isPointInPath(centre[X], centre[Y]+cirHeights[1])) tempMaxY = centre[Y]+cirHeights[1];
    else tempMaxY = bustStart[Y];
  
    ctx.stroke();
  
  
    ctx.moveTo(waistEnd[X], waistEnd[Y]);
    ctx.lineTo(bustEnd[X], bustEnd[Y]);
    ctx.stroke();
}

function makeFile() {

    const pngUrl = canvas.toDataURL("image/png");
    // Download the PNG image
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "tshirt-pattern2.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}

// Generate a pattern when the button is clicked
const generateBtn = document.getElementById("generate-btn");
generateBtn.addEventListener("click", drawPattern);
