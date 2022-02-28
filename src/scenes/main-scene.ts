import { ControlPoint } from "../builders/control-point";
import { RailwayBuilder } from "../builders/railway-builder";
import { GraphBuilder } from "../builders/graph-builder";
import { GraphEvents } from "../events/graph-events";

export class MainScene extends Phaser.Scene {


  constructor() {
    super({ key: "MainScene" });
  }

  railwayBuilder: RailwayBuilder;
  graphBuilder: GraphBuilder;
  initBuilders(){
    this.railwayBuilder = new RailwayBuilder(this);
    this.graphBuilder = new GraphBuilder(this, this.railwayBuilder);
  }

  graphEvents: GraphEvents;
  initEvents(){
	this.graphEvents = new GraphEvents();
  }

  create(): void {
	this.initBuilders();
	this.initEvents();

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
