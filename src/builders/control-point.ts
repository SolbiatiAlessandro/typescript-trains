import {Point} from '../objects/point'

export class ControlPoint extends Phaser.GameObjects.Image {
	_point: Point;

	constructor(
		scene: Phaser.Scene,
		public x: number = Math.random() * 1000, 
		public y: number = Math.random() * 500,
	){ 
		super(scene, x, y, 'controlPoint');
		scene.add.existing(this);
		this._point = new Point(x, y);
		this.setInteractive();
		this.setScale(0.5);
		this.setData('vector', this._point.vector);
		this.setData('isControl', true);
		scene.input.setDraggable(this);
	};

}
