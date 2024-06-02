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
            const killChance = Math.ceil(Math.random() * 2) // Boss has a 50% chance to survive a bullet.
            console.log(killChance)

            if (killChance === 1) {

                //Check if boss has been hit (allows for other bullets to pass through)
                if (event.other.hit === false) {
                    this.kill();
                }
                event.other.hit = true;

                //Add money & do particles
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

                //Wait 1.5 sec to kill (so particles show for 1.5s)
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
            }
        } else if (event.other instanceof Enemy) {
            engine.currentScene.addMoney(10);
            this.kill();
            event.other.kill();
        }

    }

    removeBullet() {
        this.kill();
    }
}