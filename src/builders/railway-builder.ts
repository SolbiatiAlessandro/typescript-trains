import {MainScene} from '../scenes/main-scene';
import {Railway} from '../builders/railway';
import {Node} from '../objects/node';
import {Edge} from '../objects/edge';
import {IRailway} from '../interfaces/IRailway.interface';


export class RailwayBuilder {
	railways: Array<IRailway> = [];
	
	// distinction between top and bottom is for rail intersection to look realistic
	topBuildingGroup: Phaser.GameObjects.Group; // for iron bars in rail
	bottomBuildingGroup: Phaser.GameObjects.Group; // for wooden planks in rail

	constructor(public scene: MainScene){
	  this.topBuildingGroup = new Phaser.GameObjects.Group(
			  this.scene, 
			  [], 
			  {classType: Phaser.GameObjects.Sprite, name: "railwayTopBuildingGroup"}
	  );
	  this.bottomBuildingGroup = new Phaser.GameObjects.Group(
			  this.scene, 
			  [], 
			  {classType: Phaser.GameObjects.Sprite, name: "railwayBottomBuildingGroup"}
	  );
	};

	createRailway(startNode: Node, endNode: Node){
	  let railway: IRailway = {
		  bottomRailway: new Railway(
			  this.scene, 
			  this.bottomBuildingGroup,
			  startNode,
			  endNode,
			  'rail-bottom'
		  ),
		  topRailway: new Railway(
			  this.scene, 
			  this.topBuildingGroup,
			  startNode,
			  endNode,
			  'rail-top'
		  ),
		  testCurve: new Edge(startNode, endNode, true)
	  };
	  this.railways.push(railway);
	  return railway;
	}

	update(){
		// later we want to update railways only if it's in selected mode
		let railway_selected = true;
		if(railway_selected){
			this.railways.forEach(irailway => {
				irailway.bottomRailway.update(this.topBuildingGroup);
				irailway.topRailway.update(this.bottomBuildingGroup);
				irailway.testCurve.points();
			});
			this.topBuildingGroup.setDepth(2);
			this.bottomBuildingGroup.setDepth(1);
		}
	}
}
