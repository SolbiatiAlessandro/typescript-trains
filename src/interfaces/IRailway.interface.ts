import {Railway} from '../builders/railway';
import {Edge} from '../objects/edge';

export interface IRailway {
	bottomRailway: Railway,
	topRailway: Railway,
	testCurve: Edge
}
