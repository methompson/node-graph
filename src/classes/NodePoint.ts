interface SquareOptions {
  radius?: number;
};

class NodePoint {
  x: number;
  y: number;
  title: string;
  inputs: Array<string>;
  outputs: Array<string>;
  canvas: HTMLCanvasElement;
  titleFontSize: number;
  ioFontSize: number;
  radius: number;
  padding: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = 0;
    this.y = 0;
    this.radius = 5;
    this.title = "";
    this.inputs = [];
    this.outputs = [];
    this.canvas = canvas;
    this.titleFontSize = 10;
    this.ioFontSize = 10;

    this.padding = 2;
  }

  setFont(size: number) {
    this.titleFontSize = size;
  }

  draw() {
    this.makeRect(this.canvas)

    this.makeTitle();

    this.makeInputs();
    this.makeOutputs();
  }

  getTitleHeight():number {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      return 0;
    }

    ctx.font = `${this.titleFontSize}pt sans-serif`;

    const textHeight:number = ctx.measureText(this.title).hangingBaseline + this.padding;

    return textHeight;
  }

  makeTitle():void {
    const ctx = this.canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.fillStyle = "#000";
    ctx.font = `${this.titleFontSize}pt sans-serif`;
    const textHeight:number = ctx.measureText(this.title).hangingBaseline;

    ctx.fillText(this.title, this.x + this.radius, this.y + textHeight + this.padding);
  }

  getInputsHeight():number {
    return this.getIOHeight(this.inputs);
  }

  getOutputsHeight():number {
    return this.getIOHeight(this.outputs);
  }

  getIOHeight(io: Array<string>):number {
    const ctx = this.canvas.getContext("2d");

    if (!ctx) {
      return 0;
    }

    const totalInputs:number = io.length;

    const height = (totalInputs * (10 + 8)) + this.radius;

    return height;
  }

  getInputsWidth():number {
    return this.getIOWidth(this.inputs);
  }

  getOutputsWidth():number {
    return this.getIOWidth(this.outputs);
  }

  getIOWidth(io: Array<string>):number {
    const ctx = this.canvas.getContext("2d");

    if (!ctx) {
      return 0;
    }

    ctx.font = `${this.ioFontSize}pt sans-serif`;
    let maxWidth:number = 0;
    io.forEach((label) => {
      const textWidth:number = ctx.measureText(label).width;

      if (textWidth > maxWidth) {
        maxWidth = textWidth;
      }
    });

    // Width of text, plus width of square, plus padding
    return maxWidth + 10 + 1 + 2;
  }

  makeInputs():void {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const titleHeight:number = this.getTitleHeight();
    const x = this.x + 1;
    let y = this.y + titleHeight + this.padding + 8;

    ctx.font = `${this.ioFontSize}pt sans-serif`;
    this.inputs.forEach((input) => {
      ctx.fillStyle = "rgb(255, 251, 0)";

      ctx.fillRect(x, y, 10, 10);

      ctx.fillStyle = "#000";
      ctx.fillText(input, x + 10 + 2, y + 10)

      y += 10 + 8;
    });
  }

  makeOutputs():void {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const titleHeight:number = this.getTitleHeight();
    const rightEdge = this.getRectWidth();
    console.log("rightEdge", rightEdge);

    // Right edge, minus quare width, minux 1 border
    const x = this.x + rightEdge - 10 - 1;
    let y = this.y + titleHeight + this.padding + 8;

    ctx.font = `${this.ioFontSize}pt sans-serif`;
    ctx.direction = "rtl";

    this.outputs.forEach((output) => {
      ctx.fillStyle = "rgb(255, 251, 0)";

      ctx.fillRect(x, y, 10, 10);

      ctx.fillStyle = "#000";
      ctx.fillText(output, x - 1, y + 10)

      y += 10 + 8;
    });
  }

  getRectWidth():number {
    // Input Width, output width and some padding
    return this.getInputsWidth() + this.getOutputsWidth() + 10;
  }

  // Rectangle height should be:
  // Title, plus padding
  // And either the largest of all inputs or all outputs, plus their respective padding.
  // Width should be Title, plus input titles and output titles.

  makeRect(canvas: HTMLCanvasElement):void {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const inputHeight:number = this.getInputsHeight();
    const outputHeight: number = this.getOutputsHeight();

    const ioheight = inputHeight > outputHeight ? inputHeight : outputHeight;
    const height:number = this.getTitleHeight() + ioheight + this.padding * 2;
    const width:number = this.getRectWidth();

    console.log("width", width);

    const smallestDimension = width < height ? width : height;
    const maxRadius = smallestDimension / 2;

    console.log(width);

    if (this.radius > maxRadius) {
      this.radius = maxRadius;
    }

    ctx.beginPath();

    ctx.moveTo(this.x, this.y + this.radius);
    ctx.arcTo(this.x, this.y, this.x + this.radius, 20, this.radius);

    ctx.lineTo((this.x + width) - this.radius, this.y);
    ctx.arcTo(this.x + width, this.y, this.x + width, this.y + this.radius, this.radius);

    ctx.lineTo(this.x + width, this.y + height - this.radius);
    ctx.arcTo(this.x + width, this.y + height, this.x + width - this.radius, this.y + height, this.radius);

    ctx.lineTo(this.x + this.radius, this.y + height);
    ctx.arcTo(this.x, this.y + height, this.x, this.y + height - this.radius, this.radius);

    ctx.lineTo(this.x, this.y + this.radius);

    ctx.fillStyle = "#aaa";
    ctx.strokeStyle = "#333";

    ctx.fill();
    ctx.stroke();
  }
}

export default NodePoint;
