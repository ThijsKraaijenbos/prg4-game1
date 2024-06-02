import '../css/style.css'
import { Engine, Timer, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Level } from './level.js';
import { GameOver } from './gameover.js';
import { StartScreen } from './startscene.js';
import { WinScreen } from './winscreen.js';

export class Game extends Engine {
    money = 0;
    moneyLabel;
    enemiesSpawned = 0;
    waveCount = 0;

    constructor() {
        super({ width: 800, height: 600, antialiasing: false });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");

        this.add('start', new StartScreen())
        this.add('level', new Level())
        this.add('game-over', new GameOver())
        this.add('winscreen', new WinScreen())
        this.goToScene('start')
    }
}

new Game();
