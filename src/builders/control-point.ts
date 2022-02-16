import {Point} from '../objects/point'
import {Node} from '../objects/node'

export class ControlPoint extends Phaser.GameObjects.Image {
	_point: Point;
	_brother: ControlPoint;
	_parentNode: Node = null;
	_line: Phaser.GameObjects.Line = null;

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

	setNode(node: Node){ 
		this._parentNode = node 
		if(!this._line) this._brother.setLine(this.createLine());
	} 
	setLine(line: Phaser.GameObjects.Line){ this._line = line; }
	setBrother(brother: ControlPoint){ 
		this._brother = brother;
   	}

	createLine(): Phaser.GameObjects.Line{
		this._line = new Phaser.GameObjects.Line(
			this.scene, 
			0, 0,
			this.x, this.y,
			this._brother.x, this._brother.y,
			0xffffff, 0.5
		);
		this._line.setOrigin(0, 0);
		this.scene.add.existing(this._line);
		return this._line;
	}

	onDrag(x: number, y: number, second: boolean = false){
		this.x = x;
		this.y = y;
		this.data.get('vector').set(x, y);
		
		if(!second){
			// https://stackoverflow.com/questions/7077651/python-like-unpacking-in-javascript
			this._brother.onDrag(...this._parentNode.reflect(x, y), true);
			this._line.setTo(this.x, this.y, this._brother.x, this._brother.y);

		}
	}
}
