import {Node} from './node'

export class Edge extends Phaser.Curves.CubicBezier{
	segments: number;
	breakingEmitter: Phaser.Events.EventEmitter;
	private readonly LENGTH_SEGMENT_RATIO: number = 15;
	private readonly BREAKING_DISTANCE: number = 5;
	private readonly BREAKING_DISTANCE_EVENT: string = 'breaking_distance';

	constructor(startNode: Node, endNode: Node){
		super(
			startNode.vector, 
			startNode.rightControlPoint.vector,
			endNode.leftControlPoint.vector,
			endNode.vector
		);
		this.segments = Math.floor(this.getLength() / this.LENGTH_SEGMENT_RATIO);
		this.breakingEmitter = new Phaser.Events.EventEmitter();
	}

	_emitBreakingDistance(firstPoint: Phaser.Math.Vector2, secondPoint: Phaser.Math.Vector2): Phaser.Math.Vector2 {
		if(Phaser.Math.Distance.BetweenPoints(firstPoint, secondPoint) > this.BREAKING_DISTANCE){
			this.breakingEmitter.emit(this.BREAKING_DISTANCE_EVENT);
		}
		return secondPoint;
	}


	points(): 
		Array<[Phaser.Math.Vector2, Phaser.Math.Vector2]>{
		const points: Array<Phaser.Math.Vector2> = this.getPoints(this.segments);
		points.reduce((previousPoint, currentPoint) => this._emitBreakingDistance(previousPoint, currentPoint), points[0]);
		return Array(this.segments + 1).fill(0).map(
			(_, i) => {
				var _t = this.getTangent(i / (this.segments + 1));
				return [points[i], _t]})
	}
}
