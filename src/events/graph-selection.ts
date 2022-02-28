import { GraphBuilder } from '../builders/graph-builder';
import { Railway } from '../builders/railway';
import { IRailway } from '../interfaces/irailway.interface';
import { Node } from '../objects/node';

export class GraphSelection extends Phaser.Events.EventEmitter{
	private readonly HOVEROUT_EDGE_EVENT: string = "_HOVEROUT_EDGE";
	private readonly HOVER_EDGE_EVENT: string = "_HOVER_EDGE";
	private readonly SELECT_EDGE_EVENT: string = "_SELECT_EDGE";
	private readonly DESELECT_EDGE_EVENT: string = "_DESELECT_EDGE";
	//
	//graphBuilder not public, can't be accessed by railway
	constructor(public graphBuilder: GraphBuilder){
		super();
		this.on(this.SELECT_EDGE_EVENT, function(railway: Railway){
			// make node appear
			this.scene.player.selected = railway;
			let nodes: Array<Node> = this.getNodesFromEdge(railway.key);
			nodes.forEach(node => node.display(true));

			let irailway: IRailway = this.getEdgeAttribute(railway.key);
			irailway.shadowRailway.buildingGroup.setVisible(true);
		}, graphBuilder)
		this.on(this.DESELECT_EDGE_EVENT, function(railway: Railway){
			// make node appear
			this.scene.player.selected = null;
			let nodes: Array<Node> = this.getNodesFromEdge(railway.key);
			nodes.forEach(node => node.display(false));

			let irailway: IRailway = this.getEdgeAttribute(railway.key);
			irailway.shadowRailway.buildingGroup.setVisible(false);
		}, graphBuilder)
		this.on(this.HOVER_EDGE_EVENT, function(railway: Railway){
			let irailway: IRailway = this.getEdgeAttribute(railway.key);
			irailway.shadowRailway.buildingGroup.setVisible(true);
		}, graphBuilder)
		this.on(this.HOVEROUT_EDGE_EVENT, function(railway: Railway){
			let irailway: IRailway = this.getEdgeAttribute(railway.key);
			irailway.shadowRailway.buildingGroup.setVisible(false);
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

	hoverEdge(railway: Railway){
		this.emit(this.HOVER_EDGE_EVENT, railway);
	}

	hoverEdgeOut(railway: Railway){
		if(this.graphBuilder.scene.player.selected == null ||
		   this.graphBuilder.scene.player.selected.key != railway.key){
			this.emit(this.HOVEROUT_EDGE_EVENT, railway);
		}
	}
}
