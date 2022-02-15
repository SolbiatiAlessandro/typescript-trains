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
	};
}
