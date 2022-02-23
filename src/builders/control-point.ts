import {Node} from '../objects/node'

export class ControlPoint extends Phaser.GameObjects.Image {
	private _brother: ControlPoint;
	private _parentNode: Node = null;
	private _line: Phaser.GameObjects.Line = null;
	depth: number = 3;
	scale: number = 0.5;
	controlVector: Phaser.Math.Vector2;
	testVector: Phaser.Math.Vector2;

	constructor(
		scene: Phaser.Scene,
		public x: number = Math.random() * 1000, 
		public y: number = Math.random() * 500,
	){ 
		super(scene, x, y, 'controlPoint');
		scene.add.existing(this);
		this.setInteractive();
		this.controlVector = new Phaser.Math.Vector2(this.x, this.y);
		this.testVector = new Phaser.Math.Vector2(this.x, this.y);
		this.setData('controlVector', this.controlVector);
		this.setData('testVector', this.testVector);
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
		let center = this.scene.add.image(
			(this.x + this._brother.x) / 2,
			(this.y + this._brother.y) / 2,
			'controlPointCenter'
		);
		center.setDepth(this.depth + 1);
		center.setScale(this.scale);


		this._line = new Phaser.GameObjects.Line(
			this.scene, 
			0, 0,
			this.x, this.y,
			this._brother.x, this._brother.y,
			0xffffff, 0.5
		);
		this._line.setOrigin(0, 0);
		this._line.setDepth(this.depth);
		this.scene.add.existing(this._line);
		return this._line;
	}

	onDrag(x: number, y: number, second: boolean = false){
		this.x = x;
		this.y = y;
		this.data.get('controlVector').set(x, y);
		this.data.get('testVector').set(x, y);
		
		if(!second){
			this._brother.onDrag(...this._parentNode.reflect(x, y), true);
			this._line.setTo(this.x, this.y, this._brother.x, this._brother.y);
		}
	}
}
