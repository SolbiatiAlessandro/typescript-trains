import {Edge} from '../objects/edge';
import {Point} from '../objects/point';
import {Node} from '../objects/node';
import {ControlPoint} from './control-point';
import {MainScene} from '../scenes/main-scene';
import {Railway} from '../builders/railway'


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

	createRailway(){
	  this.railways.push(new Railway(this.scene, this.buildingGroup));
	}

	update(){
		// later we want to update railways only if it's in selected mode
		this.railways.forEach(railway => railway.update(this.buildingGroup));
	}
}
