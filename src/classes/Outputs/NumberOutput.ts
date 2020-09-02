import NodeIO from "../BaseClasses/NodeIO";

class NumberOutput extends NodeIO {
  userChangeable: boolean = false;

  constructor(title: string) {
    super(title);

    this.type = Number;
    this.value = 0;
  }
}

export default NumberOutput;
