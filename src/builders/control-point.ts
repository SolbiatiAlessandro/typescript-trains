import { Node } from "../objects/node";
import { GraphBuilder } from "../builders/graph-builder";
import { Constants } from "../constants";

export class ControlPoint extends Phaser.GameObjects.Image {
  private _brother: ControlPoint;
  private _parentNode: Node = null;
  private _line: Phaser.GameObjects.Line = null;
  depth: number = 3;
  scale: number = 0.6;
  controlVector: Phaser.Math.Vector2;
  testVector: Phaser.Math.Vector2;

  private readonly ERROR_COLOR = Constants.ERROR_COLOR;
  private readonly OK_COLOR = Constants.SECONDARY_COLOR;

  constructor(
    scene: Phaser.Scene,
    public x: number = Math.random() * 1000,
    public y: number = Math.random() * 500
  ) {
    super(scene, x, y, "controlPoint");
    scene.add.existing(this);
    this.setInteractive();
    this.controlVector = new Phaser.Math.Vector2(this.x, this.y);
    this.testVector = new Phaser.Math.Vector2(this.x, this.y);
    this.setData("controlVector", this.controlVector);
    this.setData("testVector", this.testVector);
    this.setData("isControl", true);
    scene.input.setDraggable(this);
	this.tint = this.OK_COLOR;
  }

  setNode(node: Node) {
    this._parentNode = node;
    if (!this._line) this._brother.setLine(this.createLine());
  }
  setLine(line: Phaser.GameObjects.Line) {
    this._line = line;
  }
  setBrother(brother: ControlPoint) {
    this._brother = brother;
  }

  createLine(): Phaser.GameObjects.Line {
    let center = this.scene.add.image(
      (this.x + this._brother.x) / 2,
      (this.y + this._brother.y) / 2,
      "controlPointCenter"
    );
    center.setDepth(this.depth + 2);
    center.setScale(this.scale * 1.5);

    this._line = new Phaser.GameObjects.Line(
      this.scene,
      0,
      0,
      this.x,
      this.y,
      this._brother.x,
      this._brother.y,
      this.OK_COLOR,
      0.5
    );
    this._line.setOrigin(0, 0);
    this._line.setDepth(this.depth);
    this.scene.add.existing(this._line);
    return this._line;
  }

  onDrag(
    graphBuilder: GraphBuilder,
    x: number,
    y: number,
    second: boolean = false
  ) {
    const edges = graphBuilder.getEdges(this._parentNode);
    if (!edges.some((edge) => edge.testRailway.broken)) {
      this.data.get("controlVector").set(x, y);
      this.setTint(this.OK_COLOR);
      this._line.setStrokeStyle(0.5, this.OK_COLOR, 1);
    } else {
      this.setTint(this.ERROR_COLOR);
      this._line.setStrokeStyle(0.5, this.ERROR_COLOR, 1);
    }
    this.x = x;
    this.y = y;
    this.data.get("testVector").set(x, y);

    if (!second) {
      this._brother.onDrag(
        graphBuilder,
        ...this._parentNode.reflect(x, y),
        true
      );
      this._line.setTo(this.x, this.y, this._brother.x, this._brother.y);
    }
  }
}
