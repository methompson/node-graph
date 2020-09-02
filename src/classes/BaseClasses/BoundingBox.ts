import { Coordinates } from "../types";

class BoundingBox {
  a: Coordinates = { x: 0, y: 0 };
  b: Coordinates = { x: 0, y: 0 };

  setBoundingBox(a: Coordinates, b: Coordinates): void {
    this.a = a;
    this.b = b;
  }

  isInsideBoundary(x: number, y: number): boolean {
    let leftX, rightX;
    if (this.a.x < this.b.x) {
      leftX = this.a.x;
      rightX = this.b.x;
    } else {
      leftX = this.b.x;
      rightX = this.a.x;
    }

    let topY, bottomY;
    if (this.a.y < this.b.y) {
      topY = this.a.y;
      bottomY = this.b.y;
    } else {
      topY = this.b.y;
      bottomY = this.a.y;
    }

    // console.log(x, y, leftX, rightX, topY, bottomY);

    return x >= leftX
      && x <= rightX
      && y >= topY
      && y <= bottomY;
  }
}

export default BoundingBox;
