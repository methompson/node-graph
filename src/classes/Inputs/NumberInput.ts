import NodeIO from "../BaseClasses/NodeIO";

class NumberInput extends NodeIO {
  constructor(title: string) {
    super(title);

    this.type = Number;
    this.value = 0;
  }

  getInput(num: number): void {
    this.value = num;
  }
}

export default NumberInput;
