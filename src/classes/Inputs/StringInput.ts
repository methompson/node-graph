import NodeIO from "../BaseClasses/NodeIO";

class StringInput extends NodeIO {
  constructor(title: string) {
    super(title);

    this.type = String;
    this.value = 0;
  }

  getValue(value: string): void {
    this.value = value;
  }
}

export default StringInput;
