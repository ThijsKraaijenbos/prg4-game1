import { Vector } from "excalibur";
import { Enemy } from "./enemy";
import { Resources } from "./resources";

export class BossEnemy extends Enemy {
    hit = false;
    constructor() {
        super();
        this.graphics.use(Resources.BossEnemy.toSprite());
    }

    onInitialize(engine) {
        this.actions.clearActions();

        const path = [
            // Start point
            new Vector(748, 600),

            // Pathfinding points
            new Vector(750, 300), //middle path point
            new Vector(750, 50),
            new Vector(575, 50), //middle path point
            new Vector(375, 50),
            new Vector(375, 115), //middle path point
            new Vector(375, 175),
            new Vector(475, 175), //middle path point
            new Vector(575, 175),
            new Vector(575, 275), //middle path point
            new Vector(575, 375),
            new Vector(425, 375),
            new Vector(425, 560),
            new Vector(225, 560),
            new Vector(225, 455), //middle path point
            new Vector(225, 300),
            new Vector(-20, 300),
        ];

        let movedBack = 2;

        // Spawn at start point
        this.actions.repeat(ctx => {
            this.x = path[0].x;
            this.y = path[0].y;

            // Create action queue with delays
            for (let i = 1; i < path.length; i++) {
                ctx.moveTo(path[i].x, path[i].y, 190 + (engine.waveCount * 5));
                ctx.delay(Math.random() * 1000); // Add a random delay of max 1 second

                if (movedBack === 0) {
                    const moveBack = Math.floor(Math.random() * 4); // random 1 in 4 chance to move back
                    if (moveBack === 1 && i > 1) { //i > 1 to check if it's not on the first position.
                        i -= 2;
                        movedBack = 2;
                    } else {
                        if (movedBack > 1) {
                            movedBack--;
                        }
                    }
                } else {
                    movedBack--;
                }
            }
        });

        this.on("exitviewport", () => this.removeEnemy(engine));
    }

    removeEnemy(engine) {
        this.kill();
        engine.ui.updateHealthBar(0.3);
    }
}
