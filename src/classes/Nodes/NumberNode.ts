import NodePoint from "../BaseClasses/NodePoint";
import NumberOutput from "../Outputs/NumberOutput";

class AddNode extends NodePoint {
  number: NumberOutput;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.title = "Number";

    this.number = new NumberOutput("Number");
  }

  getInputs(): Array<any> {
    return [];
  }

  getOutputs(): Array<NumberOutput> {
    return [
      this.number,
    ];
  }

  eval(): number {
    return this.number.value;
  }
}

export default AddNode;
