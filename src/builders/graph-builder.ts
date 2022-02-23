import Graph from "graphology";
import { Node } from "../objects/node";
import { MainScene } from "../scenes/main-scene";
import { RailwayBuilder } from "../builders/railway-builder";
import { ControlPoint } from "./control-point";
import { IRailway } from "../interfaces/IRailway.interface";

export class GraphBuilder {
  graph: Graph = new Graph();
  private readonly NODE: string = "_node";
  private readonly EDGE: string = "_edge";
  private readonly controlPointOffsetX = 80;
  private readonly controlPointOffsetY = 0;
  constructor(public scene: MainScene, public railwayBuilder: RailwayBuilder) {}

  createNode(x: number, y: number, name: string) {
    const left = new ControlPoint(
      this.scene,
      x - this.controlPointOffsetX,
      y - this.controlPointOffsetY
    );
    const right = new ControlPoint(
      this.scene,
      x + this.controlPointOffsetX,
      y + this.controlPointOffsetY
    );
    left.setBrother(right);
    right.setBrother(left);
    const node = new Node(x, y, left, right, name);
    this._addNode(name, node);
    return node;
  }

  _addNode(name: string, node: Node) {
    let attr: any = {};
    attr[this.NODE] = node;
    this.graph.addNode(name, attr);
  }

  createEdge(startNodeName: string, endNodeName: string) {
    this._createEdgeByNode(
      this.getNode(startNodeName),
      this.getNode(endNodeName)
    );
  }

  _createEdgeByNode(startNode: Node, endNode: Node) {
    this._addEdge(
      startNode,
      endNode,
      this.railwayBuilder.createRailway(startNode, endNode)
    );
  }

  _addEdge(startNode: Node, endNode: Node, railway: IRailway) {
    let attr: any = {};
    attr[this.EDGE] = railway;
    this.graph.addEdge(startNode.name, endNode.name, attr);
  }

  getEdges(node: Node): Array<IRailway> {
    return this.graph
      .edges(node.name)
      .map((edge) => this.graph.getEdgeAttribute(edge, this.EDGE));
  }

  getNode(name: string): Node | null {
    return this.graph.getNodeAttribute(name, this.NODE);
  }
}
