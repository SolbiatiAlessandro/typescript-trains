import { Railway } from "../builders/railway";
import { TestEdge } from "../objects/edge";

export interface IRailway {
  key: string;
  shadowRailway: Railway;
  bottomRailway: Railway;
  topRailway: Railway;
  testRailway: TestEdge;
}
