import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Enemy extends Actor {
    constructor() {
        super({ width: 16, height: 16 });
        this.graphics.use(Resources.BasicEnemy.toSprite());
        this.pos = new Vector(748, 600);
        this.scale = new Vector(2, 2);
    }

    onInitialize(engine) {
        this.actions.clearActions();

        const path = [
            // Start point
            new Vector(748, 600),

            // Pathfinding points
            new Vector(750, 50),
            new Vector(375, 50),
            new Vector(375, 175),
            new Vector(575, 175),
            new Vector(575, 375),
            new Vector(425, 375),
            new Vector(425, 560),
            new Vector(225, 560),
            new Vector(225, 300),
            new Vector(-20, 300),
        ];

        // Spawn at start point
        this.actions.repeat(ctx => {
            this.x = path[0].x;
            this.y = path[0].y;

            // Create action queue
            // Forward path (skip first spawn point)
            for (let i = 1; i < path.length; i++) {
                ctx.moveTo(path[i].x, path[i].y, 90 + (engine.waveCount * 5));
            }
        });

        this.on("exitviewport", () => this.removeEnemy(engine));
    }

    removeEnemy(engine) {
        this.kill();
        engine.ui.updateHealthBar(0.1);
    }
}
