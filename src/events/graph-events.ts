import { GraphBuilder } from '../builders/graph-builder';
import { Railway } from '../builders/railway';
import { IRailway } from '../interfaces/irailway.interface';
import { Node } from '../objects/node';

/**
 * Singleton pattern, accessible from the scene. All the logic
 * is declared in context. Events are emitted by UI (low in the abstraction, 
 * in the UI domain), and are received by Builders domain.
 */
export class GraphEvents extends Phaser.Events.EventEmitter{
	private readonly HOVER_IN_EDGE_EVENT: string = "_HOVER_IN_EDGE";
	private readonly HOVER_OUT_EDGE_EVENT: string = "_HOVER_OUT_EDGE";
	private readonly SELECT_EDGE_EVENT: string = "_SELECT_EDGE";
	private readonly DESELECT_EDGE_EVENT: string = "_DESELECT_EDGE";

	private selected: Railway = null;

	deselectCurrentEdge(){
		this.emit(this.DESELECT_EDGE_EVENT);
	}

	selectEdge(railway: Railway){
		this.emit(this.SELECT_EDGE_EVENT, railway);
	}

	hoverEdge(railway: Railway){
		this.emit(this.HOVER_IN_EDGE_EVENT, railway);
	}

	hoverEdgeOut(railway: Railway){
		this.emit(this.HOVER_OUT_EDGE_EVENT, railway);
	}
}
