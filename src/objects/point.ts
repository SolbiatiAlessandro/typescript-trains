import {MainScene} from '../scenes/main-scene'

export class Point {
	vector: Phaser.Math.Vector2;

	constructor(
		public x: number = Math.random() * 1000, 
		public y: number = Math.random() * 500
	){ this.vector = new Phaser.Math.Vector2(this.x, this.y) };

	_debug(scene: MainScene, color: string = "red"){
		const image = new Phaser.GameObjects.Image(scene, this.x, this.y, color);
		image.scale = 0.4;
		scene.add.existing(image);
	}
}
