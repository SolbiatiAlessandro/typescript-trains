import {Point} from './point'
import {IEdgeConstructor} from '../interfaces/IEdgeConstructor.interface'
import {MainScene} from '../scenes/main-scene'
import {RailwayBuilder} from '../builders/railway-builder'

export class Edge extends Phaser.Curves.CubicBezier{
	params: IEdgeConstructor;

	constructor(params: IEdgeConstructor){
		super(
			params.startNode.point.vector, 
			params.firstControlPoint._point.vector,
			params.secondControlPoint._point.vector,
			params.endNode.point.vector
		);
		this.params = params;
	}


	points(divisions: number = 50): 
		Array<[Phaser.Math.Vector2, Phaser.Math.Vector2]>{
		const points: Array<Phaser.Math.Vector2> = this.getPoints(divisions);
		return Array(divisions + 1).fill(0).map(
			(_, i) => {
				var _t = this.getTangent(i / (divisions + 1));
				return [points[i], _t]})
	}

	_debug(scene: MainScene){
		this.params.startNode.point._debug(scene, "red");
		this.params.firstControlPoint._point._debug(scene, "green");
		this.params.secondControlPoint._point._debug(scene, "green");
		this.params.endNode.point._debug(scene, "red");
	}
}
