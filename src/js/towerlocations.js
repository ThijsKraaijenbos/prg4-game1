import { Actor, Color, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";
import { Tower } from "./tower";

export class TowerLocation extends Actor {
    constructor(location) {
        super({
            height: 100,
            width: 100,
            pos: location
        });
        this.sprite = Resources['Towerlocation'].toSprite();
        this.graphics.use(this.sprite);
        this.occupied = false;
    }

    onInitialize(engine) {
        this.on('pointerdown', () => {
            if (engine.currentScene.money >= engine.price && this.occupied === false) {
                const tower = new Tower(engine.typeOfTower, engine.FBR, engine.RS, engine.AS, engine.price, engine.BVX, engine.BVY);
                tower.pos = this.pos.clone(); // Ensure the tower is positioned correctly
                engine.currentScene.add(tower); // Add the tower to the scene
                engine.currentScene.money -= engine.price;
                engine.currentScene.updateMoneyLabel();
                this.occupied = true;
                this.sprite.tint = new Color(215, 215, 215); // Apply tint
            } else if (this.occupied === true) {
                // Find the tower placed at this location and remove it
                const towers = engine.currentScene.actors.filter(actor => actor instanceof Tower && actor.pos.equals(this.pos));
                towers.forEach(tower => tower.kill());
                this.occupied = false;
                this.sprite.tint = new Color(255, 255, 255); // Remove tint
            }
        });
    }
}
