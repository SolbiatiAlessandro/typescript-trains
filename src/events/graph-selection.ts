import { GraphBuilder } from '../builders/graph-builder';
import { Railway } from '../builders/railway';
import { Node } from '../objects/node';

export class GraphSelection extends Phaser.Events.EventEmitter{
	private readonly SELECT_EDGE_EVENT: string = "_SELECT_EDGE";
	private readonly DESELECT_EDGE_EVENT: string = "_DESELECT_EDGE";
	//graphBuilder not public, can't be accessed by railway
	constructor(public graphBuilder: GraphBuilder){
		super();
		this.on(this.SELECT_EDGE_EVENT, function(railway: Railway){
			// make node appear
			this.scene.player.selected = railway;
			let nodes: Array<Node> = this.getNodesFromEdge(railway.key);
			nodes.forEach(node => node.display(true));
		}, graphBuilder)
		this.on(this.DESELECT_EDGE_EVENT, function(railway: Railway){
			// make node appear
			this.scene.player.selected = null;
			let nodes: Array<Node> = this.getNodesFromEdge(railway.key);
			nodes.forEach(node => node.display(false));
		}, graphBuilder)
	}

	deselectCurrentEdge(){
		if(this.graphBuilder.scene.player.selected){
			this.emit(this.DESELECT_EDGE_EVENT, this.graphBuilder.scene.player.selected);
		}
	}

	selectEdge(railway: Railway){
		this.emit(this.SELECT_EDGE_EVENT, railway);
	}
}
