import Graph from "graphology";
import { Node } from "../objects/node";
import { MainScene } from "../scenes/main-scene";
import { RailwayBuilder } from "../builders/railway-builder";
import { ControlPoint } from "./control-point";
import { IRailway } from "../interfaces/IRailway.interface";
import { GraphSelection } from "../events/graph-selection";

export class GraphBuilder {
  graph: Graph = new Graph();
  graphSelection: GraphSelection = new GraphSelection(this);
  private readonly NODE: string = "_node";
  private readonly EDGE: string = "_edge";
  private readonly controlPointOffsetX = 80;
  private readonly controlPointOffsetY = 0;
  constructor(public scene: MainScene, public railwayBuilder: RailwayBuilder) {
	  this.scene.graphSelection = this.graphSelection;
  }

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
    this.graph.addEdgeWithKey(railway.key, startNode.name, endNode.name, attr);
  }

  getNodesFromEdge(edgeKey: string): Array<Node> {
	  let nodesPairsFromKey = this.graph.mapEdges((key, attr, firstNode, secondNode) =>[key, firstNode, secondNode])
		  .filter(kfs => kfs[0] == edgeKey).map(kfs => [kfs[1], kfs[2]]);
	  if (nodesPairsFromKey.length == 1){
		  return nodesPairsFromKey[0].map(nodeKey => this.getNode(nodeKey));
	  }
	  return [];
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
