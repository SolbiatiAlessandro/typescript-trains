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
	  this.load.image('orange', '../assets/orange.png');
  }

  create(): void {
	  this.graphics = new Phaser.GameObjects.Graphics(this);
	  this.curve = new Edge({
		  startNode: new Node(),
		  firstControlPoint: new Point(),
		  secondControlPoint: new Point(),
		  endNode: new Node()
	  });
	  this.curve.railwayPoints(40).forEach(
		  ([point, tangent]) => {
			  /* let _p = new Point(point.x, point.y); _p._debug(this, "blue");
			  let _t = new Point(point.x + (20 * tangent.x), point.y + (20 * tangent.y)); _t._debug(this, "orange");*/
			  new Railway({
				  scene: this, 
				  x: point.x, 
				  y: point.y,
				  rotation: Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) + (Phaser.Math.PI2 / 4)
			  })
		  });
  }

  update(): void{
  }
}
