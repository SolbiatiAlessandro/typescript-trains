import {Point} from "./point"

export class Node {
	vector: Phaser.Math.Vector2;
	constructor(
		public x: number = Math.random() * 1000, 
		public y: number = Math.random() * 500
	){ this.vector = new Phaser.Math.Vector2(this.x, this.y) };
}
