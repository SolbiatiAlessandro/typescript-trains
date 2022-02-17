import {Edge} from '../objects/edge'
import {Node} from '../objects/node'

import {ControlPoint} from '../builders/control-point'
import {RailwayBuilder} from '../builders/railway-builder'
import {GraphBuilder} from '../builders/graph-builder'

export class MainScene extends Phaser.Scene {

  railwayBuilder: RailwayBuilder;
  graphBuilder: GraphBuilder;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
	  this.railwayBuilder = new RailwayBuilder(this);
	  this.graphBuilder = new GraphBuilder(this, this.railwayBuilder);

	  let startNode = this.graphBuilder.createNode( 50, 200, '1');
	  this.graphBuilder.createNode( 400, 200, '2');
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('1'),
		  this.graphBuilder.getNode('2'),
	  );
	  this.graphBuilder.createNode( 900, 400, '3');
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('2'),
		  this.graphBuilder.getNode('3'),
	  );
	  this.graphBuilder.createNode( 800, 100, '4');
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('2'),
		  this.graphBuilder.getNode('4'),
	  );
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('4'),
		  this.graphBuilder.getNode('3'),
	  );
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('3'),
		  this.graphBuilder.getNode('1'),
	  );

	  let path = new Phaser.Curves.Path(50, 200);
	  path.add(this.graphBuilder.getEdges(this.graphBuilder.getNode('1'))[1].topRailway.edge);
	  path.add(this.graphBuilder.getEdges(this.graphBuilder.getNode('2'))[1].topRailway.edge);
	  path.add(this.graphBuilder.getEdges(this.graphBuilder.getNode('3'))[2].topRailway.edge);
	  let train = this.add.follower(path, 50, 200, 'train');
	   train.startFollow({
        duration: 10000,
        yoyo: false,
        repeat: -1,
        rotateToPath: true,
    });

	  this._inputs();
  }

  _inputs(): void{
	  this.input.on('drag', function (pointer: any, gameObject: ControlPoint, dragX: number, dragY: number) {
		  gameObject.onDrag(dragX, dragY);
	  });
  }

  update(): void{
	this.railwayBuilder.update();
  }
}
