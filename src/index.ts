import NodeGraph from "./classes/BaseClasses/NodeGraph";
import * as nodes from "./classes/Nodes/Nodes";

const app = document.getElementById("app");
let canvas;

if (app) {
  canvas = makeCanvas(app);

  const g = new NodeGraph(canvas);

  const n1 = new nodes.AddNode(canvas);
  n1.x = 20;
  n1.y = 20;

  g.addNode(n1);

  const n2 = new nodes.NumberNode(canvas);
  n2.x = 40;
  n2.y = 40;

  // g.addNode(n2);

  const n3 = new nodes.NumberNode(canvas);
  n3.x = 60;
  n3.y = 60;

  // g.addNode(n3);

}

function makeCanvas(app: HTMLElement):HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  // canvas.width = 400;
  // canvas.height = 400;

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