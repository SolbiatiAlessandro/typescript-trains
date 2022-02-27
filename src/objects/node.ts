import { ControlPoint } from "../builders/control-point";

export class Node {
  public vector: Phaser.Math.Vector2;

  constructor(
    public x: number,
    public y: number,
    public leftControlPoint: ControlPoint,
    public rightControlPoint: ControlPoint,
    public name: string,
  ) {
    this.vector = new Phaser.Math.Vector2(this.x, this.y);
    leftControlPoint.setNode(this);
    rightControlPoint.setNode(this);
	leftControlPoint.display(false);
	rightControlPoint.display(false);
  }

  display(show: boolean = true){
	this.leftControlPoint.display(show);
	this.rightControlPoint.display(show);
  }

  reflect(x: number, y: number): [number, number] {
    return [this.x - (x - this.x), this.y - (y - this.y)];
  }
}
