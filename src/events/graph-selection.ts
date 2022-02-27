import { GraphBuilder } from '../builders/graph-builder';
import { Railway } from '../builders/railway';
import { Node } from '../objects/node';

export class GraphSelection extends Phaser.Events.EventEmitter{
	private readonly SELECT_EDGE_EVENT: string = "_SELECT_EDGE";
	//graphBuilder not public, can't be accessed by railway
	constructor(graphBuilder: GraphBuilder){
		super();
		this.on(this.SELECT_EDGE_EVENT, function(railway: Railway){
			// make node appear
			this.scene.player.selected = railway;
			let nodes: Array<Node> = this.getNodesFromEdge(railway.key);
			nodes.forEach(node => node.display());
		}, graphBuilder)
	}

	selectEdge(railway: Railway){
		this.emit(this.SELECT_EDGE_EVENT, railway);
	}
}
