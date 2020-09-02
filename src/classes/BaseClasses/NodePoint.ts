import { v4 as uuidv4 } from 'uuid';

import NodeIO from "./NodeIO";

class NodePoint {
  id: string;

  canvas: HTMLCanvasElement;

  x: number;
  y: number;

  inputs: Array<NodeIO>;
  outputs: Array<NodeIO>;
  ioFontSize: number;
  ioSquareSize: number;
  ioPaddingSize: number;
  borderSize: number;

  title: string;
  titleFontSize: number;

  radius: number;
  verticalPadding: number;

  rectHeight: number;
  rectWidth: number;

  // Clean determines the state of the node and whether it needs to be re-evaluated
  clean: boolean;

  // Valid determines if all inputs are satisfied to evaluate
  protected valid: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.id = uuidv4();
    this.x = 0;
    this.y = 0;
    this.radius = 5;
    this.title = "";
    this.inputs = [];
    this.outputs = [];
    this.canvas = canvas;
    this.titleFontSize = 10;
    this.ioFontSize = 10;

    this.ioSquareSize = 10;
    this.ioPaddingSize = 8;
    this.borderSize = 1;

    this.rectHeight = 0;
    this.rectWidth = 0;

    this.verticalPadding = 2;
    this.valid = false;

    this.clean = false;
  }

  /**
   * Sets the font of the Node
   * @param size Font Size
   */
  setFont(size: number): void {
    this.titleFontSize = size;
  }

  /**
   * Setter for the position values
   *
   * @param x X position on the canvas
   * @param y Y Position on the canvs
   */
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  getContext(): CanvasRenderingContext2D|null {
    return this.canvas.getContext("2d");
  }

  /**
   * Draws all of the individual elements of the Node
   */
  draw(): void {
    this.drawRect()

    this.drawTitle();

    this.drawInputs();
    this.drawOutputs();
  }

  /**
   * Determines if the x,y coordinates are within the boundaries of the node element
   *
   * @param x Mouse X position on canvas element
   * @param y Mouse Y position on canvas element
   */
  insideNodeBounds(x: number, y: number): boolean {
    if (x >= this.x
      && x <= (this.x + this.rectWidth)
      && y >= this.y
      && y <= (this.y + this.rectHeight)
    ) {
      return true;
    }

    return false;
  }

  // TODO figure out how to determine if the mouse position is in part of the node allows for dragging
  // the node or if it's on one of the ioBoundaries for making connections. Maybe the node looks to
  // determine if it's on an io boundary and does one thing and defaults to dragging the node.
  dragBoundaries() {}

  // TODO: Each Input and Output should calculate its own bounding box. Then we can use those bounding
  // boxes for both drawing AND determining drag params.
  ioBoundaries(x: number, y: number) {
    const inputs: Array<NodeIO> = this.getInputs();
    const outputs: Array<NodeIO> = this.getOutputs();

    inputs.forEach((input) => {
      console.log(input.isClicked(x, y));
    });

    outputs.forEach((output) => {
      console.log(output.isClicked(x, y));
    });
  }

  /**
   * gets all inputs from the Node and returns an array for use in rendering the box
   */
  getInputs(): Array<NodeIO> {
    return [];
  }

  /**
   * gets all outputs from the Node and returns an array for use in rendering the box
   */
  getOutputs(): Array<NodeIO> {
    return [];
  }

  /**
   * Determines the height of the title based on the font size and title text.
   */
  getTitleHeight(): number {
    const ctx: CanvasRenderingContext2D|null = this.getContext();
    if (!ctx) {
      return 0;
    }

    ctx.font = `${this.titleFontSize}pt sans-serif`;

    const textHeight: number = ctx.measureText(this.title).hangingBaseline + this.verticalPadding;

    return textHeight;
  }

  /**
   * Determines the graphical width of the title based on the font size and title text
   */
  getTitleWidth(): number {
    const ctx: CanvasRenderingContext2D|null = this.getContext();
    if (!ctx) {
      return 0;
    }

    ctx.font = `${this.titleFontSize}pt sans-serif`;
    return ctx.measureText(this.title).width;
  }

  /**
   * Draws the title on to the canvas element. This element is based on position, radius, font size and padding.
   */
  drawTitle(): void {
    const ctx: CanvasRenderingContext2D|null = this.getContext();

    if (!ctx) {
      return;
    }

    const rectCenter: number = this.getRectWidth() /2;

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.direction = "ltr";
    ctx.font = `${this.titleFontSize}pt sans-serif`;
    const textHeight: number = ctx.measureText(this.title).hangingBaseline;

    ctx.fillText(this.title, this.x + rectCenter, this.y + textHeight + this.verticalPadding);
  }

  /**
   * Gets the height of all the inputs.
   */
  getInputsHeight(): number {
    return this.getIOHeight(this.getInputs());
  }

  /**
   * Gets the height of all the outputs.
   */
  getOutputsHeight(): number {
    return this.getIOHeight(this.getOutputs());
  }

  /**
   * Common function for calculating the graphical height of all the inputs and outputs. The values are based
   * on the radius so that the squares don't overlap on the corner radius curve.
   *
   * @param io Array of io elements
   */
  getIOHeight(io: Array<NodeIO>): number {
    const ctx: CanvasRenderingContext2D|null = this.getContext();

    if (!ctx) {
      return 0;
    }

    const totalInputs: number = io.length;

    const height = (totalInputs * (this.ioSquareSize + this.ioPaddingSize)) + this.radius;

    return height;
  }

  /**
   * Gets the maximum width of all the inputs.
   */
  getInputsWidth(): number {
    return this.getIOWidth(this.getInputs());
  }

  /**
   * Gets the maximum width of all the outputs.
   */
  getOutputsWidth(): number {
    return this.getIOWidth(this.getOutputs());
  }

  /**
   * Common function for calculating the graphical maximum width of all the inputs and outputs.
   *
   * @param io Array of NodeIO values
   */
  getIOWidth(io: Array<NodeIO>): number {
    const ctx: CanvasRenderingContext2D|null = this.getContext();

    if (!ctx) {
      return 0;
    }

    ctx.font = `${this.ioFontSize}pt sans-serif`;
    let maxWidth: number = 0;
    io.forEach((label) => {
      const textWidth: number = ctx.measureText(label.name).width;

      if (textWidth > maxWidth) {
        maxWidth = textWidth;
      }
    });

    // Width of text, plus width of square, plus padding
    return maxWidth + this.ioSquareSize + 1 + 2;
  }

  /**
   * Draws all inputs on to the canvas.
   */
  drawInputs(): void {
    const ctx: CanvasRenderingContext2D|null = this.getContext();
    if (!ctx) {
      return;
    }

    const titleHeight: number = this.getTitleHeight();
    const x = this.x + this.borderSize;
    let y = this.y + titleHeight + this.verticalPadding + this.ioPaddingSize;

    ctx.font = `${this.ioFontSize}pt sans-serif`;
    ctx.textAlign = "start";
    ctx.direction = "ltr";

    this.getInputs().forEach((input) => {
      ctx.fillStyle = "rgb(255, 251, 0)";

      // We set the bounding box to the dimension, plus the input square size.
      input.setBoundingBox(x, y, x + this.ioSquareSize, y + this.ioSquareSize);
      ctx.fillRect(x, y, this.ioSquareSize, this.ioSquareSize);

      ctx.fillStyle = "#000";
      ctx.fillText(input.name, x + this.ioSquareSize + 2, y + this.ioSquareSize)

      y += this.ioSquareSize + this.ioPaddingSize;
    });
  }

  /**
   * Draws all outputs on to the canvas.
   */
  drawOutputs(): void {
    const ctx: CanvasRenderingContext2D|null = this.getContext();
    if (!ctx) {
      return;
    }

    const titleHeight: number = this.getTitleHeight();
    const rightEdge = this.getRectWidth();

    // Right edge, minus square width, minus border
    const x = this.x + rightEdge - this.ioSquareSize - this.borderSize;
    let y = this.y + titleHeight + this.verticalPadding + this.ioPaddingSize;

    ctx.font = `${this.ioFontSize}pt sans-serif`;
    ctx.textAlign = "start";
    ctx.direction = "rtl";

    this.getOutputs().forEach((output) => {
      ctx.fillStyle = "rgb(255, 251, 0)";

      output.setBoundingBox(x, y, x + this.ioSquareSize, y + this.ioSquareSize);
      ctx.fillRect(x, y, this.ioSquareSize, this.ioSquareSize);

      ctx.fillStyle = "#000";
      ctx.fillText(output.name, x - this.borderSize, y + this.ioSquareSize)

      y += this.ioSquareSize + this.ioPaddingSize;
    });
  }

  /**
   * Gets the total width of the longest input value and longest output value, then adds padding to them.
   */
  getRectWidth(): number {
    // 10 is the padding between the inputs and outputs
    return this.getInputsWidth() + this.getOutputsWidth() + 10;
  }

  // Rectangle height should be:
  // Title, plus padding
  // And either the largest of all inputs or all outputs, plus their respective padding.
  // Width should be Title, plus input titles and output titles.

  drawRect(): void {
    const ctx: CanvasRenderingContext2D|null = this.getContext();

    if (!ctx) {
      return;
    }

    const inputHeight: number = this.getInputsHeight();
    const outputHeight: number = this.getOutputsHeight();

    const ioheight = inputHeight > outputHeight ? inputHeight : outputHeight;
    const height: number = this.getTitleHeight() + ioheight + this.verticalPadding * 2;
    const width: number = this.getRectWidth();

    this.rectWidth = width;
    this.rectHeight = height;

    const smallestDimension = width < height ? width : height;
    const maxRadius = smallestDimension / 2;

    if (this.radius > maxRadius) {
      this.radius = maxRadius;
    }

    ctx.beginPath();

    ctx.moveTo(this.x, this.y + this.radius);
    ctx.arcTo(this.x, this.y, this.x + this.radius, this.y, this.radius);

    ctx.lineTo((this.x + width) - this.radius, this.y);
    ctx.arcTo(this.x + width, this.y, this.x + width, this.y + this.radius, this.radius);

    ctx.lineTo(this.x + width, this.y + height - this.radius);
    ctx.arcTo(this.x + width, this.y + height, this.x + width - this.radius, this.y + height, this.radius);

    ctx.lineTo(this.x + this.radius, this.y + height);
    ctx.arcTo(this.x, this.y + height, this.x, this.y + height - this.radius, this.radius);

    ctx.lineTo(this.x, this.y + this.radius);

    if (this.valid) {
      ctx.fillStyle = "#aaa";
    } else {
      ctx.fillStyle = "#daa";
    }

    ctx.strokeStyle = "#333";
    ctx.lineWidth = this.borderSize;

    ctx.fill();
    ctx.stroke();
  }

  /**
   * Interface function for determining the outputs of a value. Should be run every time an input
   * is changed
   */
  eval(): any {}
}

export default NodePoint;
