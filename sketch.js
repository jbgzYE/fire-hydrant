const SIZE = 256, sampleNum = 7;
let sampleIndex = 0, modelReady = false, isTransfering = false;
const inputImgs = [], outputImgs = [];

const manhole_covers = pix2pix('./models/manhole_covers.pict', modelLoaded);
let video;

function setup() {
  // Create canvas
  createCanvas(SIZE, SIZE);
  //background(255, 0, 0)
  // video = createCapture(VIDEO)
  // video.size(256, 256);
  // video.hide();

  outputContainer = select('#output');

  // Selcect output div container

  // Set stroke to black
  stroke(0);
  pixelDensity(1);
  clearCanvas();
}

// Draw on the canvas when mouse is pressed
function draw() {
  //background(255, 0, 0)
  //if (mouseIsPressed) {
    stroke(0, 1)
    line(mouseX, mouseY, pmouseX, pmouseY);
  //}
  // image(video, 0, 0);
  // if (modelReady && !isTransfering) {
  //   transfer()
  // }
  transfer()
}

function mouseDragged() {
  if (modelReady && !isTransfering) {
    transfer()
  }
}

function transfer() {
  isTransfering = true;
  // Select canvas DOM element
  let canvasElement = document.getElementById('defaultCanvas0');
  // Apply pix2pix transformation
  manhole_covers.transfer(canvasElement, result => {
    // Clear output container
    outputContainer.html('');
    // Create an image based result
    createImg(result.src).id("p2p-output").parent('output');
    
    isTransfering = false;
  });
}

// A function to be called when the models have loaded
function modelLoaded() {
  modelReady = true;
}

// Clear the canvas
function clearCanvas() {
  clear();
  background(255, 1);
}

function getRandomOutput() {
  image(inputImgs[sampleIndex], 0, 0);
  outputContainer.html('');
  outputImgs[sampleIndex].show().parent('output');
  sampleIndex += 1;
  if (sampleIndex > 6) sampleIndex = 0;
}

function usePencil() {
  stroke(0);
  strokeWeight(1);
  inputCanvas.removeClass('eraser');
  inputCanvas.addClass('pencil');
}

function useEraser() {
  stroke(255);
  strokeWeight(15);
  inputCanvas.removeClass('pencil');
  inputCanvas.addClass('eraser');
}


clearButton.addEventListener("click", function(){
  clearCanvas();
})