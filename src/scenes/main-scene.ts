import {Edge} from '../objects/edge'
import {Node} from '../objects/node'
import {Point} from '../objects/point'
import {Railway} from '../objects/railway'

export class MainScene extends Phaser.Scene {
  // phaser
  graphics: Phaser.GameObjects.Graphics;

  // trains
  curve: Edge;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
	  this.load.image('railway', '../assets/rail.png');
	  this.load.image('red', '../assets/red.png');
	  this.load.image('green', '../assets/green.png');
	  this.load.image('blue', '../assets/blue.png');
  }

  create(): void {
	  this.graphics = new Phaser.GameObjects.Graphics(this);
	  this.curve = new Edge({
		  startNode: new Node(),
		  firstControlPoint: new Point(),
		  secondControlPoint: new Point(),
		  endNode: new Node()
	  });
	  this.curve.railwayPoints(5).forEach(
		  ([point, tangent]) => {
			  new Railway({
				  scene: this, 
				  x: point.x, 
				  y: point.y,
				  rotation: Phaser.Math.Angle.Between(point.x, point.y, tangent.x, tangent.y)
			  })
		  });
	  this.curve._debug(this);
  }

  update(): void{
  }
}
