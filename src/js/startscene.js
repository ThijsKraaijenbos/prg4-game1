import '../css/style.css';
import { Actor, Engine, Scene, Vector, Label, Color, Font } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';

export class StartScreen extends Scene {
    onInitialize(engine) {
        // Create and configure the title label
        const title = new Label({
            text: 'Rise Of The Blobs',
            pos: new Vector(engine.drawWidth / 2, 100),
            font: new Font({
                size: 40,
                color: Color.White,
                family: 'Arial',
            })
        });
        title.anchor = new Vector(0.5, 0.5)

        const title2 = new Label({
            text: 'Get to wave 50 to beat the game',
            pos: new Vector(engine.drawWidth / 2, 170),
            font: new Font({
                size: 30,
                color: Color.White,
                family: 'Arial',
            })
        });
        title2.anchor = new Vector(0.5, 0.5)

        // Create and configure the start button
        const startButton = new Actor({
            pos: new Vector(engine.drawWidth / 2, 300),
            width: 150,
            height: 50,
            color: Color.Green,
        });

        // Add a label to the start button
        const startButtonText = new Label({
            text: 'Start Game',
            font: new Font({
                size: 20,
                color: Color.Black,
                bold: true,
                family: 'Arial',
            }),
        });

        // Center the button text within the button
        startButtonText.anchor = new Vector(0.5, 0.5)

        startButton.addChild(startButtonText);

        // Add an event listener for the start button
        startButton.on('pointerup', () => {
            engine.goToScene('level');
        });

        // Add the title and start button to the scene
        this.add(title);
        this.add(title2);
        this.add(startButton);
    }
}