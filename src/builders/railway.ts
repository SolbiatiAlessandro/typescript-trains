import { RenderedEdge } from "../objects/edge";
import { Node } from "../objects/node";
import { ControlPoint } from "./control-point";
import { MainScene } from "../scenes/main-scene";
import { Constants } from "../constants";

export class Railway {
  edge: RenderedEdge;
  rails: Array<Phaser.GameObjects.Sprite> = [];

  constructor(
    public scene: MainScene,
    buildingGroup: Phaser.GameObjects.Group,
    startNode: Node,
    endNode: Node,
    image: string,
    tint: number = Constants.PRIMARY_COLOR
  ) {
    this.edge = new RenderedEdge(startNode, endNode);
    this.edge.pointsWithTangents().forEach(([point, tangent], index) => {
      const rail = buildingGroup.getFirstDead(true, point.x, point.y, image);
      rail.setTint(tint);
      rail.rotation =
        Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) +
        Phaser.Math.PI2 / 4;

      rail.displayHeight = 32;
      rail.displayWidth = 64;
      rail.setScale(0.5);
      this.rails.push(rail);
    });
  }

  update(buildingGroup: Phaser.GameObjects.Group) {
    this.edge.pointsWithTangents().forEach(([point, tangent], index) => {
      const rail = this.rails[index];
      rail.x = point.x;
      rail.y = point.y;
      rail.rotation =
        Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) +
        Phaser.Math.PI2 / 4;
    });
  }

  kill(buildingGroup: Phaser.GameObjects.Group) {
    this.rails.forEach((rail) => buildingGroup.kill(rail));
  }
}
