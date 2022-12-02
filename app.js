const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(210, 200 - 30, 15, 100);
ctx.fillRect(350, 200 - 30, 15, 100);
ctx.fillRect(260, 200 - 30, 60, 200);

ctx.arc(290, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "green";
ctx.arc(260, 80, 6, Math.PI, 2 * Math.PI);
ctx.arc(300, 80, 6, Math.PI, 2 * Math.PI);
ctx.fill();