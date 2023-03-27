// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the width and height of the canvas
const width = 400;
const height = 400;
canvas.width = width;
canvas.height = height;

// Generate a sewing pattern
function generatePattern() {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Get the values from the form inputs
    const neckSize = parseFloat(document.getElementById("neck-size").value);
    const chestSize = parseFloat(document.getElementById("chest-size").value);
    const waistSize = parseFloat(document.getElementById("waist-size").value);
    const hipSize = parseFloat(document.getElementById("hip-size").value);
    const length = parseFloat(document.getElementById("length").value);

    // Calculate the measurements for the pattern
    const shoulderWidth = chestSize * 0.4;
    const armholeDepth = chestSize * 0.3;
    const sleeveLength = length * 0.4;
    const chestEase = 5;
    const waistEase = 10;
    const hipEase = 15;
    const shoulderSeamLength = neckSize * 0.3;
    const backNeckDrop = neckSize * 0.1;

    // Calculate the points for the pattern
    const backNeckPoint = {
        x: width / 2,
        y: height / 4
    };
    const shoulderPoint = {
        x: backNeckPoint.x - shoulderWidth / 2,
        y: backNeckPoint.y
    };
    const armholePoint = {
        x: shoulderPoint.x,
        y: shoulderPoint.y + armholeDepth
    };
    const sideWaistPoint = {
        x: width / 2 - waistSize / 4,
        y: height / 2
    };
    const hipPoint = {
        x: width / 2 - hipSize / 4,
        y: height * 3 / 4
    };
    const sideLengthPoint = {
        x: sideWaistPoint.x,
        y: hipPoint.y - length
    };
    const backLengthPoint = {
        x: backNeckPoint.x,
        y: sideLengthPoint.y
    };
    const centerFrontPoint = {
        x: width / 2,
        y: backNeckPoint.y + backNeckDrop
    };
    const frontNeckPoint = {
        x: centerFrontPoint.x - shoulderWidth / 4,
        y: centerFrontPoint.y
    };
    const frontShoulderPoint = {
        x: centerFrontPoint.x,
        y: centerFrontPoint.y
    };
    const frontArmholePoint = {
        x: centerFrontPoint.x + shoulderWidth / 4,
        y: centerFrontPoint.y + armholeDepth
    };
    const frontWaistPoint = {
        x: width / 2 + waistSize / 4,
        y: height / 2
    };
    const frontHipPoint = {
        x: width / 2 + hipSize / 4,
        y: height * 3 / 4
    };
    const frontLengthPoint = {
        x: frontWaistPoint.x,
        y: frontHipPoint.y - length
    };

    // Draw the pattern on the canvas
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(backNeckPoint.x, backNeckPoint.y);
    ctx.lineTo(shoulderPoint.x, shoulderPoint.y);
    ctx.lineTo(armholePoint.x, armholePoint.y);
    ctx.lineTo(sideWaistPoint.x, sideWaistPoint.y);
    ctx.quadraticCurveTo(width / 2, height / 2 - waistEase, hipPoint.x, hipPoint.y);
    ctx.lineTo(sideLengthPoint.x, sideLengthPoint.y);
    ctx.lineTo(backLengthPoint.x, backLengthPoint.y);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerFrontPoint.x, centerFrontPoint.y);
    ctx.lineTo(frontNeckPoint.x, frontNeckPoint.y);
    ctx.lineTo(frontShoulderPoint.x, frontShoulderPoint.y);
    ctx.lineTo(frontArmholePoint.x, frontArmholePoint.y);
    ctx.lineTo(sideWaistPoint.x, sideWaistPoint.y);
    ctx.quadraticCurveTo(width / 2, height / 2 - waistEase, frontWaistPoint.x, frontWaistPoint.y);
    ctx.lineTo(frontHipPoint.x, frontHipPoint.y);
    ctx.lineTo(sideLengthPoint.x, sideLengthPoint.y);
    ctx.closePath();
    ctx.stroke();

     // Create an SVG element from the canvas
    //  const svg = new XMLSerializer().serializeToString(canvas);
    //  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    //  const svgUrl = URL.createObjectURL(svgBlob);

    //  // Download the SVG image
    //  const downloadBtn = document.getElementById("download-btn");
    //  downloadBtn.addEventListener("click", () => {
    //    const link = document.createElement("a");
    //    link.href = svgUrl;
    //    link.download = "tshirt-pattern.svg";
    //    document.body.appendChild(link);
    //    link.click();
    //    document.body.removeChild(link);
    //  });

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
generateBtn.addEventListener("click", generatePattern);
