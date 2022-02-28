import { GraphBuilder } from "../builders/graph-builder";
import { Railway } from "../builders/railway";
import { IRailway } from "../interfaces/irailway.interface";
import { Node } from "../objects/node";

/**
 * Singleton pattern, accessible from the scene. All the logic
 * is declared in context. Events are emitted by UI (low in the abstraction,
 * in the UI domain), and are received by Builders domain.
 */
export class GraphEvents extends Phaser.Events.EventEmitter {
  private readonly HOVER_IN_RAILWAY_EVENT: string = "_HOVER_IN_RAILWAY";
  private readonly HOVER_OUT_RAILWAY_EVENT: string = "_HOVER_OUT_RAILWAY";
  private readonly SELECT_RAILWAY_EVENT: string = "_SELECT_RAILWAY";
  private readonly DESELECT_RAILWAY_EVENT: string = "_DESELECT_RAILWAY";

  private selected: Railway = null;

  railwayDeselect() {
    this.emit(this.DESELECT_RAILWAY_EVENT);
  }

  railwaySelect(railway: Railway) {
    this.emit(this.SELECT_RAILWAY_EVENT, railway);
  }

  railwayHoverIn(railway: Railway) {
    this.emit(this.HOVER_IN_RAILWAY_EVENT, railway);
  }

  railwayHoverOut(railway: Railway) {
    this.emit(this.HOVER_OUT_RAILWAY_EVENT, railway);
  }
}
