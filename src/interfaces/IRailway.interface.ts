import {Railway} from '../builders/railway';
import {TestEdge} from '../objects/edge';

export interface IRailway {
	bottomRailway: Railway,
	topRailway: Railway,
	testRailway: TestEdge
}
