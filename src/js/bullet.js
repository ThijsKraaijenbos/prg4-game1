import { Actor, Color, EmitterType, ParticleEmitter, Timer, Vector } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemy";
import { UI } from "./UI";
import { BossEnemy } from "./boss";

export class Bullet extends Actor {
    constructor(movementSpeedX, movementSpeedY) {
        super({
            width: Resources['Bullet'].width,
            height: Resources['Bullet'].height,
        });
        this.graphics.use(Resources['Bullet'].toSprite());
        this.vel.x = movementSpeedX;
        this.vel.y = movementSpeedY;
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitEnemy(event, engine));
        this.on('exitviewport', () => this.removeBullet());
    }

    hitEnemy(event, engine) {
        if (event.other instanceof BossEnemy) {
            if (event.other.hit === false) { //Check if enemy has already been hit, if it has, the bullet passes through while its dying.
                this.kill();
            }
            event.other.hit = true;

            engine.currentScene.addMoney(50);
            event.other.actions.clearActions();
            const emitter = new ParticleEmitter({
                emitterType: EmitterType.Circle,
                radius: 3,
                minVel: 160,
                maxVel: 360,
                minAngle: 0,
                maxAngle: 6.2,
                isEmitting: true,
                emitRate: 50,
                opacity: 1,
                fadeFlag: true,
                particleLife: 800,
                maxSize: 5,
                minSize: 1,
                startSize: 0,
                endSize: 0,
                acceleration: new Vector(0, 494),
                beginColor: Color.Violet,
                endColor: Color.Azure,
            });

            event.other.addChild(emitter);

            const waitToKill = new Timer({
                fcn: () => {
                    if (event.other.scene) {
                        event.other.kill();
                    }
                },
                interval: 1500,
                repeats: false
            });
            engine.currentScene.add(waitToKill);
            waitToKill.start();
        } else if (event.other instanceof Enemy) {
            engine.currentScene.addMoney(20);
            this.kill();
            event.other.kill();
        }
    }

    removeBullet() {
        this.kill();
    }
}