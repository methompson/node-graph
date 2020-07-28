import NodePoint from "./NodePoint";

class NodeGraph {
  canvas: HTMLCanvasElement;

  nodes: Array<NodePoint>;
  zList: Array<NodePoint>;

  constructor(canvas: HTMLCanvasElement) {
    this.nodes = [];
    this.zList = [];

    this.canvas = canvas;

    canvas.addEventListener("mousedown", (ev) => {
      let nodePoint = this.isNodeClicked(ev.offsetX, ev.offsetY);
      console.log(nodePoint);
    });
  }

  addNode(node:NodePoint):void {
    this.nodes.push(node);
    this.zList.push(node);
    this.drawAll();
  }

  drawAll():void {
    this.nodes.forEach((n) => {
      n.draw();
    });
  }

  isNodeClicked(x: number, y: number): NodePoint|null {
    let nodePoint: NodePoint|null = null;
    this.zList.forEach((node) => {
      if (!nodePoint) {
        nodePoint = node.insideDragBounds(x, y) ? node : null;
      }
    });

    return nodePoint;
  }

}

export default NodeGraph;
