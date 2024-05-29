import { Actor, Engine, Repeat, Timer, Vector } from "excalibur";
import { Resources } from "./resources";
import { Bullet } from "./bullet";

export class Tower extends Actor {
    constructor(typeOfTower, FBR, RS, AS, price, BVX, BVY) {
        super({
            width: Resources[typeOfTower].width,
            height: Resources[typeOfTower].height,
        });
        this.scale = new Vector(0.5, 0.5);
        this.graphics.use(Resources[typeOfTower].toSprite());
        this.name = typeOfTower;
        this.fullBulletRound = FBR; // Amount of bullets spawned per round
        this.roundSpeed = RS; // Delay between rounds in milliseconds
        this.attackSpeed = AS; // Delay between shots in milliseconds
        this.price = price; //Price
        this.BVX = BVX; //X bullet velocity
        this.BVY = BVY; //Y bullet velocity
    }

    onInitialize(engine) {
        this.startShooting(engine);
    }

    startShooting(engine) {
        const newBullet = () => {
            //Reassign velocities from string (if the velocity is a random one, it gets put in a string that's has a math.random) (see UI.js)
            //This is to be able to reassign a new random value for every separate bullet. Otherwise every bullet velocity would have the same value because of the constructor
            const xVel = eval(this.BVX)
            const yVel = eval(this.BVY)
            const newBullet = new Bullet(xVel, yVel);
            this.addChild(newBullet);
        }

        const shootRound = () => {
            for (let j = 0; j < this.fullBulletRound; j++) {
                const singleBulletTimer = new Timer({
                    fcn: newBullet,
                    interval: this.attackSpeed * j,
                    repeats: false
                });
                engine.currentScene.add(singleBulletTimer);
                singleBulletTimer.start();
            }

            // Schedule the next round of shooting
            const roundTimer = new Timer({
                fcn: shootRound,
                interval: this.roundSpeed,
                repeats: false
            })
            engine.currentScene.add(roundTimer);
            roundTimer.start();
        };

        //Shoot first round (wait same amount of seconds as roundspeed to start shooting)
        const initialRoundTimer = new Timer({
            fcn: shootRound,
            interval: this.roundSpeed,
            repeats: false
        });
        engine.currentScene.add(initialRoundTimer);
        initialRoundTimer.start();
    }
}
