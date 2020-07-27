import NodePoint from "./classes/NodePoint";

const app = document.getElementById("app");
let canvas;

if (app) {
  canvas = makeCanvas(app);
  const n = new NodePoint(canvas);

  n.title = "Test";

  n.x = 20;
  n.y = 20;

  n.inputs.push("input1");
  n.inputs.push("input2");

  n.outputs.push("veryLongOutputName");
  n.outputs.push("output2");
  n.outputs.push("output3");

  n.draw();
}

function makeCanvas(app: HTMLElement):HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = 400;
  canvas.height = 400;

  const ctx:CanvasRenderingContext2D|null = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  app.appendChild(canvas);

  return canvas;
}



function getProperTextSize(text:string, context: CanvasRenderingContext2D) {

}