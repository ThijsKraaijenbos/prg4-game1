// @ts-nocheck
import '../css/style.css';
import { Engine, KillEvent, Scene, Timer, Vector } from "excalibur";
import { Background } from './background.js';
import { Enemy } from './enemy.js';
import { UI } from './UI.js';
import { TowerLocation } from './towerlocations.js';
import { BossEnemy } from './boss.js';

export class Level extends Scene {
    money = 0;
    enemiesSpawned = 0;

    onActivate(ctx) {
        super.onActivate(ctx);
        this.engine.currentScene.clear();

        // Reset damage taken
        if (this.UI) {
            this.UI.resetDamage();
        }

        // Reset other properties if needed
        this.money = 0;
        this.enemiesSpawned = 0;
        this.engine.waveCount = 0; // Use engine's waveCount
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
        this.bossSpawned = false; // Variable to check if boss already spawned in current wave (so it only spawns 1 max)
        const wave = () => {
            // Set the number of enemies that spawn
            if (this.enemiesSpawned < 5) {
                const gooberChance = Math.ceil(Math.random() * 15); // 1 in 15 chance to spawn a goober (boss enemy)
                if (gooberChance === 1 && !this.bossSpawned && this.engine.waveCount > 2) {
                    this.add(new BossEnemy());
                    this.bossSpawned = true;
                } else {
                    this.add(new Enemy());
                }
                this.enemiesSpawned++;
                if (this.enemiesSpawned === 1) {
                    this.engine.waveCount++; // Update engine's waveCount
                    console.log(`Wave count: ${this.engine.waveCount}`);
                }
            }

            // Check the number of enemies
            if (this.enemiesSpawned >= 5) {
                this.singleEnemyTimer?.stop();
                this.enemiesSpawned = 0;
                this.bossSpawned = false;
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

    addMoney(amountToAdd) {
        this.money += amountToAdd;
        this.updateMoneyLabel();
    }

    updateMoneyLabel() {
        if (this.UI) {
            this.UI.updateMoney(this.money);
        }
    }

    onPreUpdate() {
        if (this.engine.waveCount === 50) {
            this.engine.goToScene('winscreen')
        }
    }
}
