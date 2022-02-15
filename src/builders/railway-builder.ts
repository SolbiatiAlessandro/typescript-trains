import {Edge} from '../objects/edge';
import {Point} from '../objects/point';
import {Node} from '../objects/node';
import {ControlPoint} from './control-point';
import {MainScene} from '../scenes/main-scene';
import {Rail} from '../builders/rail';

export class RailwayBuilder extends Phaser.GameObjects.Group {
	edges: Array<Edge> = []; 

	constructor(public scene: MainScene){
		super(scene);
	}

	newRailway(){
	  const edge = new Edge({
		  startNode: new Node(),
		  firstControlPoint: new ControlPoint(this.scene),
		  secondControlPoint: new ControlPoint(this.scene),
		  endNode: new Node()
	  });
	  this.edges.push(edge);
	}

	paintRailway(edge: Edge, _debug: boolean = false){
	  edge._railwayPoints(50).forEach(
		  ([point, tangent]) => {
			  if(_debug){
				  let _p = new Point(point.x, point.y); _p._debug(this.scene, "blue");
				  let _t = new Point(point.x + (20 * tangent.x), point.y + (20 * tangent.y)); _t._debug(this.scene, "orange");
			  }
			  const rail = this.getFirstDead(true, point.x, point.y, 'rail');
			  rail.rotation = Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) + (Phaser.Math.PI2 / 4);
			  rail.displayHeight = 32;
			  rail.displayWidth = 64;
			  rail.setScale(0.5);
	  });
	}

	update(){
		for(const edge of this.edges){
			this.paintRailway(edge);
		}
	}
}
