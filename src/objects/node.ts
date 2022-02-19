import {ControlPoint} from "../builders/control-point"

export class Node {
	public vector: Phaser.Math.Vector2;

	constructor(
		public x: number,
		public y: number,
	    public leftControlPoint: ControlPoint,
	    public rightControlPoint: ControlPoint,
	){ 
		this.vector = new Phaser.Math.Vector2(this.x, this.y) 
		leftControlPoint.setNode(this);
		rightControlPoint.setNode(this);
	};

	reflect(x: number, y: number): [number, number]{
		return [
			this.x - (x - this.x), 
			this.y - (y - this.y)
		];
	}
}
