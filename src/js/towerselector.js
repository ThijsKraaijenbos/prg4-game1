import { Actor } from "excalibur";
import { Resources } from "./resources";

export class TowerSelector extends Actor {
    onInitialize(engine) {
        let i = 0;

        // Scout always needs to be the last object in this array, to make sure the scrolling between types is handled correctly.
        const typeOfTowerArray = [
            { type: "Minigunner", FBR: 15, RS: 8000, AS: 20, price: 250, BVX: 1000, BVY: "Math.floor(Math.random() * 90) - 45" },
            { type: "Sniper", FBR: 1, RS: 2500, AS: 0, price: 500, BVX: 2800, BVY: 0 },
            { type: "Turret", FBR: 8, RS: 5000, AS: 1, price: 1500, BVX: "700 + Math.floor(Math.random() * 200)", BVY: "Math.floor(Math.random() * 500) - 250" },
            { type: "Starburst", FBR: 50, RS: 10000, AS: 0, price: 3000, BVX: "Math.floor(Math.random() * -3000) + 1500", BVY: "Math.floor(Math.random() * -3000) + 1500" },
            { type: "Scout", FBR: 3, RS: 4000, AS: 100, price: 25, BVX: 1000, BVY: 0 },
        ];
        engine.typeOfTower = typeOfTowerArray[typeOfTowerArray.length - 1].type;
        engine.FBR = typeOfTowerArray[typeOfTowerArray.length - 1].FBR;
        engine.RS = typeOfTowerArray[typeOfTowerArray.length - 1].RS;
        engine.AS = typeOfTowerArray[typeOfTowerArray.length - 1].AS;
        engine.price = typeOfTowerArray[typeOfTowerArray.length - 1].price;
        engine.BVX = typeOfTowerArray[typeOfTowerArray.length - 1].BVX;
        engine.BVY = typeOfTowerArray[typeOfTowerArray.length - 1].BVY;

        engine.currentScene.UI.switchTowerButton.on('pointerdown', () => {
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

            engine.currentScene.UI.towerSprite.graphics.use(Resources[engine.typeOfTower].toSprite());
            engine.currentScene.UI.towerInfoLabel1.text = engine.typeOfTower;
            engine.currentScene.UI.towerInfoLabel2.text = `Cost: ${engine.price.toString()}$`;
            engine.currentScene.UI.towerInfoLabel3.text = `Round Speed: ${(engine.RS / 1000).toString()}s`;
            engine.currentScene.UI.towerInfoLabel4.text = `Bullets/Round: ${engine.FBR.toString()}`;
        });
    }
}