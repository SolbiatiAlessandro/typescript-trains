import { MainScene } from "../scenes/main-scene";
import { Railway } from "../builders/railway";
import { Node } from "../objects/node";
import { TestEdge } from "../objects/edge";
import { Constants } from "../constants";
import { IRailway } from "../interfaces/IRailway.interface";

export class RailwayBuilder {
  railways: Array<IRailway> = [];

  // distinction between top and bottom is for rail intersection to look realistic
  shadowBuildingGroups: Array<Phaser.GameObjects.Group> = []; // for iron bars in rail
  topBuildingGroup: Phaser.GameObjects.Group; // for iron bars in rail
  bottomBuildingGroup: Phaser.GameObjects.Group; // for wooden planks in rail

  constructor(public scene: MainScene) {
    this.topBuildingGroup = new Phaser.GameObjects.Group(this.scene, [], {
      classType: Phaser.GameObjects.Sprite,
      name: "railwayTopBuildingGroup",
    });
    this.bottomBuildingGroup = new Phaser.GameObjects.Group(this.scene, [], {
      classType: Phaser.GameObjects.Sprite,
      name: "railwayBottomBuildingGroup",
    });
  }

  createRailway(startNode: Node, endNode: Node) {
	  let key = startNode.name + endNode.name;
	  let shadowBuildingGroup = new Phaser.GameObjects.Group(this.scene);
	  this.shadowBuildingGroups.push(shadowBuildingGroup);
    let railway: IRailway = {
	  key: key,
	  shadowRailway: new Railway(
		key,
        this.scene,
        shadowBuildingGroup,
        startNode,
        endNode,
        "rail-bottom-shadow",
	  ),
      bottomRailway: new Railway(
		key,
        this.scene,
        this.bottomBuildingGroup,
        startNode,
        endNode,
        "rail-bottom",
      ),
      topRailway: new Railway(
		key,
        this.scene,
        this.topBuildingGroup,
        startNode,
        endNode,
        "rail-top",
		Constants.HIGHLIGHT_COLORS[Math.floor(Math.random() * Constants.HIGHLIGHT_COLORS.length)]
      ),
      testRailway: new TestEdge(startNode, endNode),
    };
    this.railways.push(railway);
	shadowBuildingGroup.setVisible(false);
    return railway;
  }

  update() {
    // later we want to update railways only if it's in selected mode
    let railway_selected = true;
    if (railway_selected) {
      this.railways.forEach((irailway) => {
        irailway.bottomRailway.update(this.topBuildingGroup);
        irailway.topRailway.update(this.bottomBuildingGroup);
        irailway.shadowRailway.update(irailway.shadowRailway.buildingGroup);
        irailway.testRailway.update();
      });
      this.topBuildingGroup.setDepth(2);
      this.bottomBuildingGroup.setDepth(1);
    }
  }
}
