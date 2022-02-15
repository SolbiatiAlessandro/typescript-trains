import Graph from 'graphology'

//trains
import {Edge} from '../objects/edge'
import {Node} from '../objects/node'
import {Point} from '../objects/point'
import {ControlPoint} from '../builders/control-point'
import {RailwayBuilder} from '../builders/railway-builder'

export class MainScene extends Phaser.Scene {

  railwayBuilder: RailwayBuilder;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
	  this.railwayBuilder = new RailwayBuilder(this);
	  this.railwayBuilder.createRailway();

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
