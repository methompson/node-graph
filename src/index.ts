import NodeGraph from "./classes/NodeGraph";
import * as nodes from "./classes/Nodes";

const app = document.getElementById("app");
let canvas;

if (app) {
  canvas = makeCanvas(app);

  const g = new NodeGraph(canvas);

  const n1 = new nodes.AddNode(canvas);
  n1.x = 20;
  n1.y = 20;

  g.addNode(n1);

  const n2 = new nodes.AddNode(canvas);
  n2.x = 200;
  n2.y = 200;

  g.addNode(n2);

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