import NodePoint from "./NodePoint";

import { HashMap, MoveNode } from "../types";

class NodeGraph {
  canvas: HTMLCanvasElement;

  nodes: Array<NodePoint>;
  nodeMap: Object;

  moveNode: MoveNode | null;

  constructor(canvas: HTMLCanvasElement) {
    this.nodes = [];
    this.moveNode = null;
    this.nodeMap = {};

    canvas.addEventListener("mousedown", (ev) => {
      this.clickHandler(ev);
    });

    canvas.addEventListener("mouseup", () => {
      this.clickEnder();
    });

    canvas.addEventListener("mousemove", (ev) => {
      this.moveHandler(ev);
    });

    this.canvas = canvas;
  }

  clickHandler(ev: MouseEvent): void {
    let node = this.isNodeClicked(ev.offsetX, ev.offsetY);

    if (!node) {
      return;
    }

    // Check if in drag boundaries
    // Check if in IO boundaries

    node.ioBoundaries(ev.offsetX, ev.offsetY);

    const moveNode: MoveNode = {
      node,
      offsetX: ev.offsetX - node.x,
      offsetY: ev.offsetY - node.y,
    };

    this.moveNode = moveNode;
  }

  clickEnder(): void {
    this.moveNode = null;
  }

  moveHandler(ev: MouseEvent): void {
    if (!this.moveNode) {
      return;
    }

    if (ev.which === 0) {
      this.clickEnder();
      return;
    }

    const newX: number = ev.offsetX - this.moveNode.offsetX;
    const newY: number = ev.offsetY - this.moveNode.offsetY;

    this.moveNode.node.setPosition(newX, newY);
    this.drawAllNodes();
  }

  addNode(node:NodePoint): void {
    // this.nodes.push(node);
    this.nodes = [
      node,
      ...this.nodes,
    ];
    this.drawAllNodes();

    this.generateNodeMap();
  }

  // TODO: Implement this
  deleteNode(id: string): void {}

  /**
   * We generate a hashmap of all Nodes so that we can access the nodes by ID
   */
  generateNodeMap(): void {
    const map: HashMap = {};
    this.nodes.forEach((node) => {
      map[node.id] = node;
    });

    this.nodeMap = map;
  }

  clearCanvas() {
    const ctx:CanvasRenderingContext2D|null = this.canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#eee";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  drawAllNodes():void {
    this.clearCanvas();

    [...this.nodes].reverse().forEach((n) => {
      n.draw();
    });
  }

  drawLineToMouse(): void{}

  drawAllLines():void {}

  moveNodeToBottom(index: number) {
    const node = this.nodes[index];
    delete this.nodes[index];
    this.nodes.push(node);
    this.nodes = this.nodes.filter(el => el);
    this.drawAllNodes();
  }

  moveNodeToTop(index: number) {
    const node = this.nodes[index];
    delete this.nodes[index];

    this.nodes = ([
      node,
      ...this.nodes,
    ]).filter(el => el);

    this.drawAllNodes();
  }

  isNodeClicked(x: number, y: number): NodePoint|null {
    let nodeIndex: number = -1;
    this.nodes.forEach((node, index) => {
      if (nodeIndex < 0 && node.insideNodeBounds(x, y)) {
        nodeIndex = index;
      }
    });

    if (nodeIndex < 0) {
      return null;
    }

    const node = this.nodes[nodeIndex];

    this.moveNodeToTop(nodeIndex);

    return node;
  }

}

export default NodeGraph;
