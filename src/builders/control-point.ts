import {Node} from '../objects/node'
import {GraphBuilder} from '../builders/graph-builder';

export class ControlPoint extends Phaser.GameObjects.Image {
	private _brother: ControlPoint;
	private _parentNode: Node = null;
	private _line: Phaser.GameObjects.Line = null;
	depth: number = 3;
	scale: number = 0.5;
	vector: Phaser.Math.Vector2;
	testVector: Phaser.Math.Vector2;

	constructor(
		scene: Phaser.Scene,
		public x: number = Math.random() * 1000, 
		public y: number = Math.random() * 500,
	){ 
		super(scene, x, y, 'controlPoint');
		scene.add.existing(this);
		this.vector = new Phaser.Math.Vector2(this.x, this.y);
		this.testVector = new Phaser.Math.Vector2(this.x, this.y);
		this.setInteractive();
		this.setData('vector', this.vector);
		this.setData('testVector', this.testVector);
		this.setData('isControl', true);
		scene.input.setDraggable(this);
	};

	setNode(node: Node){ 
		this._parentNode = node 
		if(!this._line) this._brother.setLine(this.createLine());
	} 

	setLine(line: Phaser.GameObjects.Line){ this._line = line; }
	setBrother(brother: ControlPoint){ this._brother = brother; }

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

	onDrag(graphBuilder: GraphBuilder, x: number, y: number, second: boolean = false){
		let edges = graphBuilder.getEdges(this._parentNode);
		if(!edges.some(edge => edge.testCurve.broken)){
			this.data.get('vector').set(x, y);
			this.setTint(0xFFFFFF);
			this._line.setStrokeStyle(0.5, 0xFFFFFF, 1);
		} else {
			this.setTint(0xFF0000);
			this._line.setStrokeStyle(0.5, 0xFF0000, 1);
		}
		this.x = x;
		this.y = y;
		this.data.get('testVector').set(x, y);
		
		if(!second){
			this._brother.onDrag(graphBuilder, ...this._parentNode.reflect(x, y), true);
			this._line.setTo(this.x, this.y, this._brother.x, this._brother.y);
		}
	}
}
