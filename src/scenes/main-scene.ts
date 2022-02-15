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

  preload(): void {
	  this.load.image('rail', '../assets/rail.png');
	  this.load.image('red', '../assets/red.png');
	  this.load.image('green', '../assets/green.png');
	  this.load.image('blue', '../assets/blue.png');
	  this.load.image('orange', '../assets/orange.png');
	  this.load.image('controlPoint', '../assets/controlPoint.png');
  }

  create(): void {
	  this.railwayBuilder = new RailwayBuilder(this);
	  this.railwayBuilder.newRailway();

	  this.input.on('dragstart', function (pointer: any, gameObject: any) { gameObject.setFrame(1); });
	  this.input.on('drag', function (pointer: any, gameObject: ControlPoint, dragX: number, dragY: number) {
		gameObject.x = dragX;
		gameObject.y = dragY;
		gameObject.data.get('vector').set(dragX, dragY);
	  });
	  this.input.on('dragend', function (pointer: any, gameObject: ControlPoint) {

		if (gameObject.data.get('isControl'))
		{
			gameObject.setFrame(2);
		}
		else
		{
			gameObject.setFrame(0);
		}

	  });
  }

  update(): void{
	this.railwayBuilder.update();
  }
}
