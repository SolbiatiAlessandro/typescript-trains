import {MainScene} from '../scenes/main-scene';
import {Railway} from '../builders/railway'
import {Node} from '../objects/node'


export class RailwayBuilder {
	railways: Array<Railway> = [];
	buildingGroup: Phaser.GameObjects.Group;

	constructor(public scene: MainScene){
	  this.buildingGroup = new Phaser.GameObjects.Group(
			  this.scene, 
			  [], 
			  {classType: Phaser.GameObjects.Sprite, name: "railwayBuildingGroup"}
	  );
	};

	createRailway(startNode: Node, endNode: Node){
	  this.railways.push(new Railway(
		  this.scene, 
		  this.buildingGroup,
		  startNode,
		  endNode
	  ));
	}

	update(){
		// later we want to update railways only if it's in selected mode
		this.railways.forEach(railway => railway.update(this.buildingGroup));
	}
}
