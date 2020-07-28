import NodePoint from "./NodePoint";

class AddNode extends NodePoint {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.title = "Add";
    this.inputs = [
      "Add 1",
      "Add 2",
    ];

    this.outputs = [
      "Sum",
    ];
  }
}

export default AddNode;
