import { Actor, Color, Font, Label, ScreenElement, Vector } from "excalibur";
import { Resources } from "./resources";
import { TowerSelector } from "./towerselector";

export class UI extends ScreenElement {
    constructor() {
        super();
        this.moneyLabel = new Label({
            text: 'Money: 0',
            pos: new Vector(10, 5),
            font: new Font({ size: 25 }),
        });

        this.towerLabel = new Label({
            text: 'Selected Tower:',
            pos: new Vector(10, 35),
            font: new Font({ size: 25 }),
        });

        this.towerSprite = new Label({
            scale: new Vector(0.5, 0.5),
            pos: new Vector(10, 60),
        });
        this.towerSprite.graphics.use(Resources.Scout.toSprite());

        this.towerInfoLabel1 = new Label({
            text: 'Scout',
            pos: new Vector(90, 60),
            font: new Font({ size: 16 }),
        });

        this.towerInfoLabel2 = new Label({
            text: 'Cost: 25$',
            pos: new Vector(90, 80),
            font: new Font({ size: 16 }),
        });

        this.towerInfoLabel3 = new Label({
            text: 'Round Speed: 4s',
            pos: new Vector(90, 100),
            font: new Font({ size: 16 }),
        });

        this.towerInfoLabel4 = new Label({
            text: 'Bullets/Round: 3',
            pos: new Vector(90, 120),
            font: new Font({ size: 16 }),
        });

        this.switchTowerButton = new Actor({
            height: 476,
            width: 512,
            pos: new Vector(45, 170),
            scale: new Vector(0.1, 0.1),
        });
        this.switchTowerButton.graphics.use(Resources.SwitchArrows.toSprite());

        this.healthbarBG = new Actor({ x: 0, y: 240, color: Color.Red, width: 100, height: 20 });
        this.healthbar = new Actor({ x: 0, y: 240, color: Color.Green, width: 100, height: 20 });
        this.healthbarBG.graphics.anchor = new Vector(0, this.healthbarBG.height / 50);
        this.healthbar.graphics.anchor = new Vector(0, this.healthbar.height / 50);
        this.healthbar.scale = new Vector(1, 1);
        this.damageTaken = 0;
    }

    onInitialize(engine) {
        engine.add(this.moneyLabel);
        engine.add(this.towerLabel);
        engine.add(this.towerSprite);
        engine.add(this.towerInfoLabel1);
        engine.add(this.towerInfoLabel2);
        engine.add(this.towerInfoLabel3);
        engine.add(this.towerInfoLabel4);
        engine.add(this.switchTowerButton);
        engine.add(this.healthbarBG);
        engine.add(this.healthbar);

        engine.ui = this; // Reference UI instance in the engine

        // Add and initialize TowerSelector
        const towerSelector = new TowerSelector();
        engine.add(towerSelector);
        towerSelector.onInitialize(engine);
    }

    updateMoney(money) {
        this.moneyLabel.text = `Money: ${money}`;
    }

    updateHealthBar(damageAmount) {
        this.damageTaken += damageAmount;
        this.healthbar.scale = new Vector(1 - this.damageTaken, 1); // Reduce the health bar
        if (this.damageTaken > 0.9) {
            this._engine.goToScene('game-over');
        }
    }

    resetDamage() {
        this.damageTaken = 0;
        this.healthbar.scale = new Vector(1, 1);
    }
}
