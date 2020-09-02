import NodePoint from "./BaseClasses/NodePoint";

interface Coordinates {
  x: number;
  y: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

interface HashMap {
  [details: string] : any;
};

interface MoveNode{
  node: NodePoint,
  offsetX: number,
  offsetY: number,
}

export {
  Coordinates,
  Color,
  HashMap,
  MoveNode,
};
