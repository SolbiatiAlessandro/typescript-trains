import {Edge} from '../objects/edge';
import {Point} from '../objects/point';
import {Node} from '../objects/node';
import {ControlPoint} from './control-point';
import {MainScene} from '../scenes/main-scene';
import {IRailway} from '../interfaces/IRailway.interface';

export class RailwayBuilder {
	private railways: Array<IRailway> = [];

	constructor(public scene: MainScene){};

	newRailway(){
	  const edge = new Edge({
		  startNode: new Node(),
		  firstControlPoint: new ControlPoint(this.scene),
		  secondControlPoint: new ControlPoint(this.scene),
		  endNode: new Node()
	  });
	  this.railways.push({
		  edge: edge,
		  buildingGroup: new Phaser.GameObjects.Group(this.scene)
	  })
	}

	paintRailway(railway: IRailway, _debug: boolean = false){
	  railway.edge._railwayPoints(50).forEach(
		  ([point, tangent]) => {
			  if(_debug){
				  let _p = new Point(point.x, point.y); _p._debug(this.scene, "blue");
				  let _t = new Point(point.x + (20 * tangent.x), point.y + (20 * tangent.y)); _t._debug(this.scene, "orange");
			  }
			  const rail = railway.buildingGroup.getFirstDead(true, point.x, point.y, 'rail');
			  rail.rotation = Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) + (Phaser.Math.PI2 / 4);
			  rail.displayHeight = 32;
			  rail.displayWidth = 64;
			  rail.setScale(0.5);
	  });
	}

	update(){
		this.railways.forEach(railway => this.paintRailway(railway));
	}
}
