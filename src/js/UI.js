import { Actor, Color, Font, Label, ScreenElement, Vector } from "excalibur";
import { Resources } from "./resources";

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

        let i = 0;

        // Scout always needs to be the last object in this array, to make sure the scrolling between types is handled correctly.
        const typeOfTowerArray = [
            { type: "Minigunner", FBR: 15, RS: 8000, AS: 20, price: 150, BVX: 1000, BVY: "Math.floor(Math.random() * 90) - 45" },
            { type: "Sniper", FBR: 1, RS: 2000, AS: 0, price: 250, BVX: 2200, BVY: 0 },
            { type: "Turret", FBR: 7, RS: 7000, AS: 1, price: 750, BVX: "700 + Math.floor(Math.random() * 200)", BVY: "Math.floor(Math.random() * 500) - 250" },
            { type: "Starburst", FBR: 50, RS: 10000, AS: 0, price: 2500, BVX: "Math.floor(Math.random() * -3000) + 1500", BVY: "Math.floor(Math.random() * -3000) + 1500" },
            { type: "Scout", FBR: 3, RS: 4000, AS: 100, price: 25, BVX: 800, BVY: 0 },
        ];
        engine.typeOfTower = typeOfTowerArray[typeOfTowerArray.length - 1].type;
        engine.FBR = typeOfTowerArray[typeOfTowerArray.length - 1].FBR;
        engine.RS = typeOfTowerArray[typeOfTowerArray.length - 1].RS;
        engine.AS = typeOfTowerArray[typeOfTowerArray.length - 1].AS;
        engine.price = typeOfTowerArray[typeOfTowerArray.length - 1].price;
        engine.BVX = typeOfTowerArray[typeOfTowerArray.length - 1].BVX;
        engine.BVY = typeOfTowerArray[typeOfTowerArray.length - 1].BVY;

        this.switchTowerButton.on('pointerdown', () => {
            engine.typeOfTower = typeOfTowerArray[i].type;
            engine.FBR = typeOfTowerArray[i].FBR;
            engine.RS = typeOfTowerArray[i].RS;
            engine.AS = typeOfTowerArray[i].AS;
            engine.price = typeOfTowerArray[i].price;
            engine.BVX = typeOfTowerArray[i].BVX;
            engine.BVY = typeOfTowerArray[i].BVY;

            if (i < typeOfTowerArray.length - 1) {
                i++;
            } else {
                i = 0;
            }

            this.towerSprite.graphics.use(Resources[engine.typeOfTower].toSprite());
            this.towerInfoLabel1.text = engine.typeOfTower;
            this.towerInfoLabel2.text = `Cost: ${engine.price.toString()}$`;
            this.towerInfoLabel3.text = `Round Speed: ${(engine.RS / 1000).toString()}s`;
            this.towerInfoLabel4.text = `Bullets/Round: ${engine.FBR.toString()}`;
        });
    }

    updateMoney(money) {
        this.moneyLabel.text = `Money: ${money}`;
    }

    updateHealthBar() {
        this.damageTaken += 0.1
        this.healthbar.scale = new Vector(1 - this.damageTaken, 1); // Reduce the health bar width by 10 units
        if (this.damageTaken > 0.9) {
            this._engine.goToScene('game-over');
        }
    }

    resetDamage() {
        this.damageTaken = 0;
        this.healthbar.scale = new Vector(1, 1);
    }
}
