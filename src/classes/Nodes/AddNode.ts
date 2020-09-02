import NodePoint from "../BaseClasses/NodePoint";
import NumberInput from "../Inputs/NumberInput";
import NumberOutput from "../Outputs/NumberOutput";

class AddNode extends NodePoint {
  add1: NumberInput;
  add2: NumberInput;

  sum: NumberOutput;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.title = "Add";
    this.add1 = new NumberInput("Add 1");
    this.add2 = new NumberInput("Add 2");

    this.sum = new NumberOutput("Sum");
  }

  getInputs(): Array<NumberInput> {
    return [
      this.add1,
      this.add2,
    ];
  }

  getOutputs(): Array<NumberOutput> {
    return [
      this.sum,
    ];
  }

  eval(): number {
    return this.add1.value + this.add2.value;
  }
}

export default AddNode;
