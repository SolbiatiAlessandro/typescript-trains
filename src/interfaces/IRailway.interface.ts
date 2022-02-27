import { Railway } from "../builders/railway";
import { TestEdge } from "../objects/edge";

export interface IRailway {
  key: string;
  bottomRailway: Railway;
  topRailway: Railway;
  testRailway: TestEdge;
}
