import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";
import { vector } from "excalibur/build/dist/Util/DrawUtil";

export class Background extends Actor {
    constructor() {
        super();
        this.graphics.use(Resources.BG.toSprite());
        this.pos = new Vector(400, 300); // Center of the screen
        this.z = -1
    }
}
