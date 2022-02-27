import { GraphBuilder } from '../builders/graph-builder';
import { Railway } from '../builders/railway';
import { Node } from '../objects/node';

export class GraphSelection extends Phaser.Events.EventEmitter{
	private readonly SELECT_EDGE_EVENT: string = "_SELECT_EDGE";
	//graphBuilder not public, can't be accessed by railway
	constructor(public graphBuilder: GraphBuilder){
		super();
		this.on(this.SELECT_EDGE_EVENT, function(railway: Railway, show: boolean){
			// make node appear
			this.scene.player.selected = railway;
			let nodes: Array<Node> = this.getNodesFromEdge(railway.key);
			nodes.forEach(node => node.display(show));
		}, graphBuilder)
	}

	selectEdge(railway: Railway){
		if (typeof this.graphBuilder.scene.player.selected != 'undefined'){
			this.emit(this.SELECT_EDGE_EVENT, this.graphBuilder.scene.player.selected, false);
		}
		this.emit(this.SELECT_EDGE_EVENT, railway, true);
	}
}
