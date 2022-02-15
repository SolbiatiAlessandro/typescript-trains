import {Edge} from '../objects/edge'
import {Node} from '../objects/node'
import {Point} from '../objects/point'

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
	  this.graphBuilder = new GraphBuilder(this);

	  this.graphBuilder.createNode( 50, 200, '1');
	  this.graphBuilder.createNode( 400, 200, '2');
	  this.railwayBuilder.createRailway(
		  this.graphBuilder.getNode('1'),
		  this.graphBuilder.getNode('2'),
	  );
	  this.graphBuilder.createNode( 900, 400, '3');
	  this.railwayBuilder.createRailway(
		  this.graphBuilder.getNode('2'),
		  this.graphBuilder.getNode('3'),
	  );
	  this.graphBuilder.createNode( 800, 100, '4');
	  this.railwayBuilder.createRailway(
		  this.graphBuilder.getNode('2'),
		  this.graphBuilder.getNode('4'),
	  );
	  /*
	  this.railwayBuilder.createRailway(
		  this.graphBuilder.getNode('4'),
		  this.graphBuilder.getNode('1'),
	  );
	  this.railwayBuilder.createRailway(
		  this.graphBuilder.getNode('3'),
		  this.graphBuilder.getNode('1'),
	  );
	  */

	  this._inputs();
  }

  _inputs(): void{
	  this.input.on('dragstart', function (pointer: any, gameObject: any) { gameObject.setFrame(1); });
	  this.input.on('drag', function (pointer: any, gameObject: ControlPoint, dragX: number, dragY: number) {
		gameObject.x = dragX;
		gameObject.y = dragY;
		gameObject.data.get('vector').set(dragX, dragY);
	  });
  }

  update(): void{
	this.railwayBuilder.update();
  }
}
