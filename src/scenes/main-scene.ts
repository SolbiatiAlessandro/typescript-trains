import {Edge} from '../objects/edge'
import {Node} from '../objects/node'

import {ControlPoint} from '../builders/control-point'
import {RailwayBuilder} from '../builders/railway-builder'
import {GraphBuilder} from '../builders/graph-builder'

class TempTrain extends Phaser.GameObjects.PathFollower{
	smokeCounter: number = 0;
	constructor(
		scene: Phaser.Scene, 
		path: Phaser.Curves.Path, 
		public particles: Phaser.GameObjects.Particles.ParticleEmitterManager
	){
	  super(scene, path, 50, 200, 'locomotive');
	  scene.add.existing(this);
	  this.setFrame(23);
	  this.setDepth(2);
	  this.startFollow({
        duration: 20000,
        yoyo: false,
        repeat: -1,
        rotateToPath: true,
      });
	}

	_rotationToFrame(rotation: number){
		// -3,14 -> 12
		// every 0.18 (10 degrees in radians) add one frame
		let startRotation = rotation - (-3.14);
		let framesToAdd = Math.floor(startRotation / 0.174);
		let frame = (9 + framesToAdd) % 35;
		return frame;
	   /*
	   if ( rotation <= -1.7 ) return 12;
	   if ( rotation <= -0.1 ) return 18;
	   if ( rotation <= 1.5 ) return 24;
	   if ( rotation <= 3 ) return 0;
	   return 11;*/
	}

	update(){
		console.log(this.rotation);
		let frame = this._rotationToFrame(this.rotation);
		console.log(frame);
		this.setFrame(frame);
		this.rotation = 0;
		this.smokeCounter += 1;
		if(this.smokeCounter == 20){
			this.particles.emitParticleAt(this.x, this.y);
			this.smokeCounter = 0;
		}
	}
}

export class MainScene extends Phaser.Scene {

  railwayBuilder: RailwayBuilder;
  graphBuilder: GraphBuilder;
  train: TempTrain;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {

	  var particles = this.add.particles('explosion');
	   particles.createEmitter({
        frame: [ 'smoke-puff' ],
        angle: { min: 240, max: 300 },
        speed: { min: 0, max: 50 },
        quantity: 3,
        lifespan: 10000,
        alpha: { start: 0.6, end: 0 },
        scale: { start: 0.5, end: 0.2 },
        on: false
    });
	particles.setDepth(5);

	  this.railwayBuilder = new RailwayBuilder(this);
	  this.graphBuilder = new GraphBuilder(this, this.railwayBuilder);

	  let startNode = this.graphBuilder.createNode( 50, 200, '1');
	  this.graphBuilder.createNode( 400, 200, '2');
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('1'),
		  this.graphBuilder.getNode('2'),
	  );
	  this.graphBuilder.createNode( 900, 400, '3');
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('2'),
		  this.graphBuilder.getNode('3'),
	  );
	  this.graphBuilder.createNode( 800, 100, '4');
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('2'),
		  this.graphBuilder.getNode('4'),
	  );
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('4'),
		  this.graphBuilder.getNode('3'),
	  );
	  this.graphBuilder.createEdge(
		  this.graphBuilder.getNode('3'),
		  this.graphBuilder.getNode('1'),
	  );

	  let path = new Phaser.Curves.Path(50, 200);
	  path.add(this.graphBuilder.getEdges(this.graphBuilder.getNode('1'))[1].topRailway.edge);
	  path.add(this.graphBuilder.getEdges(this.graphBuilder.getNode('2'))[1].topRailway.edge);
	  path.add(this.graphBuilder.getEdges(this.graphBuilder.getNode('3'))[2].topRailway.edge);
	  this.train = new TempTrain(this, path, particles);

	  this._inputs();
  }

  _inputs(): void{
	  this.input.on('drag', function (pointer: any, gameObject: ControlPoint, dragX: number, dragY: number) {
		  gameObject.onDrag(dragX, dragY);
	  });
  }

  update(): void{
	this.railwayBuilder.update();
	this.train.update();
  }
}
