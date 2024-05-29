import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemy";
import { UI } from "./UI";

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
        if (event.other instanceof Enemy) {
            engine.currentScene.addMoney();
            event.other.kill();
            this.kill();
        }
    }

    removeBullet() {
        this.kill();
    }
}

