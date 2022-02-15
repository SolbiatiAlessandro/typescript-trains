import {Edge} from '../objects/edge';
import {Point} from '../objects/point';
import {Node} from '../objects/node';
import {ControlPoint} from './control-point';
import {MainScene} from '../scenes/main-scene';

export class Railway{
	edge: Edge;
	rails: Array<Phaser.GameObjects.Sprite> = []; 

	constructor(public scene: MainScene, buildingGroup: Phaser.GameObjects.Group){
	  this.edge = new Edge({
		  startNode: new Node(),
		  firstControlPoint: new ControlPoint(this.scene),
		  secondControlPoint: new ControlPoint(this.scene),
		  endNode: new Node()
	  });
	  this.edge.points().forEach(
		  ([point, tangent], index) => {
			  const rail = buildingGroup.getFirstDead(true, point.x, point.y, 'rail');
			  rail.rotation = Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) + (Phaser.Math.PI2 / 4);

			  rail.displayHeight = 32;
			  rail.displayWidth = 64;
			  rail.setScale(0.5);
			  this.rails.push(rail);
	  });
	}

	update(buildingGroup: Phaser.GameObjects.Group){
	  this.edge.points().forEach(
		  ([point, tangent], index) => {
			  const rail = this.rails[index];
			  rail.x = point.x;
			  rail.y = point.y;
			  rail.rotation = Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) + (Phaser.Math.PI2 / 4);
	  });
	}

	kill(buildingGroup: Phaser.GameObjects.Group){
		this.rails.forEach(rail => buildingGroup.kill(rail));
	}
}

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
		this.railways.forEach(railway => railway.update(this.buildingGroup));
	}
}
