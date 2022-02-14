import {MainScene} from '../scenes/main-scene'

export class Point {
	vector: Phaser.Math.Vector2;
	x: number;
	y: number;

	constructor(){
		this.x = Math.random() * 1000;
		this.y = Math.random() * 500;
		this.vector = new Phaser.Math.Vector2(this.x, this.y);
	}

	_debug(scene: MainScene, color: string = "red"){
		const image = new Phaser.GameObjects.Image(scene, this.x, this.y, color);
		scene.add.existing(image);
	}
}
