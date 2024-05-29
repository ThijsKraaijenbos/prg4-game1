import '../css/style.css';
import { Engine, KillEvent, Scene, Timer, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Background } from './background.js';
import { Enemy } from './enemy.js';
import { UI } from './UI.js';
import { TowerLocation } from './towerlocations.js';
import { GameOver } from './gameover.js';

export class Level extends Scene {
    money = 0;
    enemiesSpawned = 0;
    waveCount = 0;

    onActivate(ctx) {
        super.onActivate(ctx);
        this.engine.currentScene.clear()

        // Reset damage taken
        if (this.UI) {
            this.UI.resetDamage();
        }

        // Reset other properties if needed
        this.money = 0;
        this.enemiesSpawned = 0;
        this.waveCount = 0;
        this.updateMoneyLabel();


        // Add background & money
        this.add(new Background());
        this.UI = new UI();
        this.add(this.UI);

        this.singleEnemyTimer = new Timer({
            fcn: () => this.spawnEnemy(),
            interval: 500,
            repeats: true
        });
        this.add(this.singleEnemyTimer);
        this.singleEnemyTimer.start();

        this.addMoneyTimer();

        // Possible tower locations
        const locations = [
            new Vector(300, 115),
            new Vector(500, 275),
            new Vector(150, 375),
            new Vector(150, 550),
            new Vector(325, 475),
            new Vector(675, 125),
            new Vector(675, 300),
            new Vector(675, 475),
        ];

        // Load in tower locations
        for (let i = 0; i < locations.length; i++) {
            const location = locations[i];
            const towerLocation = new TowerLocation(location);
            this.add(towerLocation);
        }
    }

    spawnEnemy() {
        const wave = () => {
            // Set the number of enemies that spawn
            if (this.enemiesSpawned < 5) {
                this.add(new Enemy());
                this.enemiesSpawned += 1;
                if (this.enemiesSpawned === 1) {
                    this.waveCount++;
                    console.log(`Waves count: ${this.waveCount}`);
                }
            }

            // Check the number of enemies
            if (this.enemiesSpawned >= 5) {
                this.singleEnemyTimer?.stop();
                this.enemiesSpawned = 0;
            }
        };

        // Spawn initial wave
        wave();

        const wavesTimer = new Timer({
            fcn: wave,
            interval: 10000, // Time between waves
            repeats: true
        });
        this.add(wavesTimer);
        wavesTimer.start();
    }

    addMoneyTimer() {
        const moneyTimer = new Timer({
            fcn: () => {
                this.money += 1;
                this.updateMoneyLabel();
            },
            interval: 500,
            repeats: true
        });
        this.add(moneyTimer);
        moneyTimer.start();
    }

    addMoney() {
        this.money += 25;
        this.updateMoneyLabel();
    }

    updateMoneyLabel() {
        if (this.UI) {
            this.UI.updateMoney(this.money);
        }
    }
}
