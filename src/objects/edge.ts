import {Point} from './point'
import {IEdgeConstructor} from '../interfaces/IEdgeConstructor.interface'
import {MainScene} from '../scenes/main-scene'

export class Edge extends Phaser.Curves.CubicBezier{
	params: IEdgeConstructor;

	constructor(params: IEdgeConstructor){
		super(
			params.startNode.point.vector, 
			params.firstControlPoint.vector,
			params.secondControlPoint.vector,
			params.endNode.point.vector
		);
		this.params = params;
	}

	// point to paint railway, 
	// and tangent direction of railway image
	railwayPoints(divisions: number = 99): 
		Array<[Phaser.Math.Vector2, Phaser.Math.Vector2]>{
		const points: Array<Phaser.Math.Vector2> = this.getPoints(divisions);
		return Array(divisions).fill(0).map(
			(_, i) => [points[i], this.getTangent(i)])
	}

	_debug(scene: MainScene){
		this.params.startNode.point._debug(scene, "red");
		this.params.firstControlPoint._debug(scene, "green");
		this.params.secondControlPoint._debug(scene, "green");
		this.params.endNode.point._debug(scene, "red");
	}
}
