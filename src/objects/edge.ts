import {Node} from './node'

export class Edge extends Phaser.Curves.CubicBezier{
	segments: number;
	broken: boolean = false;
	private readonly LENGTH_SEGMENT_RATIO: number = 15;
	private readonly BREAKING_DISTANCE_MAX: number = 23;
	private readonly BREAKING_CURVATURE_MIN: number = 0.05;
	private readonly BREAKING_DISTANCE_MAX_EVENT: string = 'breaking_distance';


	constructor(startNode: Node, endNode: Node, public testCurve: boolean = false){
		super(
			startNode.vector, 
			!testCurve ? startNode.rightControlPoint.vector : startNode.rightControlPoint.testVector,
			!testCurve ? endNode.leftControlPoint.vector : endNode.leftControlPoint.testVector,
			endNode.vector
		);
		console.log(this.testCurve);
		this.segments = Math.floor(this.getLength() / this.LENGTH_SEGMENT_RATIO);
		this.breakingEmitter = new Phaser.Events.EventEmitter();
	}

	_emitBreakingDistance(firstPoint: Phaser.Math.Vector2, secondPoint: Phaser.Math.Vector2): Phaser.Math.Vector2 {
		if(Phaser.Math.Distance.BetweenPoints(firstPoint, secondPoint) > this.BREAKING_DISTANCE){
			this.breakingEmitter.emit(this.BREAKING_DISTANCE_EVENT);
		}
		return secondPoint;
	}

	_emitBreakingDistance(firstPoint: Phaser.Math.Vector2, secondPoint: Phaser.Math.Vector2): Phaser.Math.Vector2 {
		const distance = Phaser.Math.Distance.BetweenPoints(firstPoint, secondPoint);
		this.broken = this.broken || distance > this.BREAKING_DISTANCE_MAX; // OOP ugly, state dependent
		return secondPoint;
	}

	// https://en.wikipedia.org/wiki/Menger_curvature#Definition
	_breakingCurvature(
		a: Phaser.Math.Vector2,
		b: Phaser.Math.Vector2,
		c: Phaser.Math.Vector2
	): Phaser.Math.Vector2{
		if (typeof c != 'undefined'){
			const A = (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
			const d = Phaser.Math.Distance.BetweenPoints;
			const curv = 2 * A / ( d(a,b) * d(a,c) * d(b,c) ) ;
			this.broken = this.broken || curv >= this.BREAKING_CURVATURE_MIN;
			return b;
		}
	}


	points(): 
		Array<[Phaser.Math.Vector2, Phaser.Math.Vector2]>{
		const points: Array<Phaser.Math.Vector2> = this.getPoints(this.segments);
		if (this.testCurve){
			this.broken = false;
			points.reduce((previousPoint, currentPoint) => this._emitBreakingDistance(previousPoint, currentPoint), points[0]);
			points.reduce((previousPoint, currentPoint, index, points) => this._breakingCurvature(previousPoint, currentPoint, points[index + 1]));
		}
		return Array(this.segments + 1).fill(0).map(
			(_, i) => {
				var _t = this.getTangent(i / (this.segments + 1));
				return [points[i], _t]})
	}
}

// TODO: if this work test curve must extend Edge
