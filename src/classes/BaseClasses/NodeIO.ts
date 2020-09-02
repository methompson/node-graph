import { v4 as uuidv4 } from 'uuid';
import { Coordinates } from '../types';

import BoundingBox from "./BoundingBox";

class NodeIO {
  name: string;
  id: string;
  type: Function;
  value: any;
  clean: boolean;
  boundingBox: BoundingBox;

  constructor(title: string) {
    this.name = title;
    this.id = uuidv4();
    this.type = Function;
    this.value = null;
    this.clean = false;

    this.boundingBox = new BoundingBox();
  }

  setBoundingBox(x1: number, y1: number, x2: number, y2: number): void {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    this.boundingBox.setBoundingBox(a, b);
  }

  isClicked(x: number, y: number): boolean {
    return this.boundingBox.isInsideBoundary(x, y);
  }

  eval(): any {}

}

export default NodeIO;