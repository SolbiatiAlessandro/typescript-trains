import {Node} from '../objects/node'
import {Point} from '../objects/point'
import {ControlPoint} from '../builders/control-point'

export interface IEdgeConstructor {
	startNode: Node,
	firstControlPoint: ControlPoint,
	secondControlPoint: ControlPoint,
	endNode: Node,
}
