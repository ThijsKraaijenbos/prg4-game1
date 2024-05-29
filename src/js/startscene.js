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
                color: Color.White,
                family: 'Arial',
            })
        });

        // Center the button text within the button
        startButtonText.pos = new Vector(startButton.width / 2 - startButtonText.width / 2, startButton.height / 2 - startButtonText.height / 2);

        startButton.addChild(startButtonText);

        // Add an event listener for the start button
        startButton.on('pointerup', () => {
            engine.goToScene('level');
        });

        // Add the title and start button to the scene
        this.add(title);
        this.add(startButton);
    }
}