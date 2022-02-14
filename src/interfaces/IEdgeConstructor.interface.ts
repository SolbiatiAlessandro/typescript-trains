import {Node} from '../objects/node'
import {Point} from '../objects/point'

export interface IEdgeConstructor {
	startNode: Node,
	firstControlPoint: Point,
	secondControlPoint: Point,
	endNode: Node,
}
