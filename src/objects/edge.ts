import {Node} from './node'

export class Edge extends Phaser.Curves.CubicBezier{
	segments: number;
	private readonly LENGTH_SEGMENT_RATIO: number = 15;

	constructor(startNode: Node, endNode: Node){
		super(
			startNode.vector, 
			startNode.rightControlPoint.vector,
			endNode.leftControlPoint.vector,
			endNode.vector
		);
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
}
