import { IRailwayConstructor } from '../interfaces/IRailwayConstructor.interface';

export class Railway extends Phaser.GameObjects.Image {
  constructor(params: IRailwayConstructor) {
    super(params.scene, params.x, params.y, 'railway');
	this.rotation = params.rotation;
    this.scene.add.existing(this);
  }
}
