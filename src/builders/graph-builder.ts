import Graph from 'graphology'
import {Node} from '../objects/node'
import {MainScene} from '../scenes/main-scene'
import {ControlPoint} from './control-point';


export class GraphBuilder {
	graph: Graph = new Graph();
	private readonly NODE: string = '_node';
	private readonly controlPointOffsetX = 80;
	private readonly controlPointOffsetY = 0;
	constructor(public scene: MainScene){}
	
	createNode(x: number, y: number, name: string){
		const left = new ControlPoint(
				this.scene, 
				x - this.controlPointOffsetX, 
				y - this.controlPointOffsetY
			);
		const right = new ControlPoint(
				this.scene, 
				x + this.controlPointOffsetX, 
				y + this.controlPointOffsetY
			);
		left.setBrother(right);
		right.setBrother(left);
		const node = new Node(x, y, left, right);
		this._addNode(name, node);
		return node;
	}

	_addNode(name: string, node: Node){
		let attr: any = {};
		attr[this.NODE] = node;
		this.graph.addNode(name, attr);
	}

	getNode(name: string): Node | null {
		return this.graph.getNodeAttribute(name, this.NODE);
	}
}
