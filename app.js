const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const destroyBtn = document.getElementById("destroy-btn");
const eraserbtn = document.getElementById("eraser-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
    isPainting = true;
}
function canclePainting() {
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    color.value = colorValue;
}
function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}
function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}
function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "50px sans-serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}
function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserbtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);