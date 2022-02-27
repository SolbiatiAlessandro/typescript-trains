import { ControlPoint } from "../builders/control-point";
import { RailwayBuilder } from "../builders/railway-builder";
import { GraphBuilder } from "../builders/graph-builder";
import { GraphSelection } from "../events/graph-selection";
import { Player } from "../objects/player";

export class MainScene extends Phaser.Scene {
  railwayBuilder: RailwayBuilder;
  graphBuilder: GraphBuilder;
  graphSelection: GraphSelection;
  player: Player;

  constructor() {
    super({ key: "MainScene" });
  }

  create(): void {
    this.railwayBuilder = new RailwayBuilder(this);
    this.graphBuilder = new GraphBuilder(this, this.railwayBuilder);
	this.player = new Player();

    this.graphBuilder.createNode(50, 200, "1");
    this.graphBuilder.createNode(400, 200, "2");
    this.graphBuilder.createEdge("1", "2");

    this.graphBuilder.createNode(900, 400, "3");
    this.graphBuilder.createEdge("2", "3");
    this.graphBuilder.createNode(800, 100, "4");
    this.graphBuilder.createEdge("2", "4");

    this._inputs();
  }

  _inputs(): void {
    this.input.on(
      "drag",
      function (
        pointer: any,
        gameObject: ControlPoint,
        dragX: number,
        dragY: number
      ) {
        gameObject.onDrag(this.graphBuilder, dragX, dragY);
      }.bind(this)
    );
  }

  update(): void {
    this.railwayBuilder.update();
  }
}
