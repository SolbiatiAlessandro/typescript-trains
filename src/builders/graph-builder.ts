import Graph from 'graphology'
import {Node} from '../objects/node'


export class GraphBuilder {
	graph: Graph = new Graph();
	private readonly NODE: string = '_node';

	constructor(){
	}

	addNode(name: string, node: Node){
		let attr: any = {};
		attr[this.NODE] = node;
		this.graph.addNode(name, attr);
	}

	getNode(name: string): Node | null {
		return this.graph.getNodeAttribute(name, this.NODE);
	}
}
