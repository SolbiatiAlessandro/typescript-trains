import {Point} from './point'
import {IEdgeConstructor} from '../interfaces/IEdgeConstructor.interface'
import {MainScene} from '../scenes/main-scene'
import {RailwayBuilder} from '../builders/railway-builder'

export class Edge extends Phaser.Curves.CubicBezier{
	params: IEdgeConstructor;
	segments: number;
	private readonly LENGTH_SEGMENT_RATIO: number = 15;

	constructor(params: IEdgeConstructor){
		super(
			params.startNode.vector, 
			params.firstControlPoint._point.vector,
			params.secondControlPoint._point.vector,
			params.endNode.vector
		);
		this.params = params;
		this.segments = Math.floor(this.getLength() / this.LENGTH_SEGMENT_RATIO);
	}


	points(): 
		Array<[Phaser.Math.Vector2, Phaser.Math.Vector2]>{
		const points: Array<Phaser.Math.Vector2> = this.getPoints(this.segments);
		return Array(this.segments + 1).fill(0).map(
			(_, i) => {
				var _t = this.getTangent(i / (this.segments + 1));
				return [points[i], _t]})
	}

	_debug(scene: MainScene){
		//this.params.startNode.point._debug(scene, "red");
		this.params.firstControlPoint._point._debug(scene, "green");
		this.params.secondControlPoint._point._debug(scene, "green");
		//this.params.endNode.point._debug(scene, "red");
	}
}
