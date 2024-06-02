import '../css/style.css';
import { Actor, Engine, Scene, Vector, Label, Color, Font } from 'excalibur';

export class WinScreen extends Scene {
    onInitialize(engine) {
        const title = new Label({
            text: 'You won!',
            pos: new Vector(engine.drawWidth / 2, 100),
            font: new Font({
                size: 40,
                color: Color.White,
                family: 'Arial',
            })
        });
        title.anchor = new Vector(0.5, 0.5)

        const waveScore = new Label({
            text: `Good job, You got to wave ${engine.waveCount}`,
            pos: new Vector(engine.drawWidth / 2, 200),
            font: new Font({
                size: 30,
                color: Color.White,
                family: 'Arial',
            })
        });
        waveScore.anchor = new Vector(0.5, 0.5)

        // Create and configure the start button
        const mainMenuButton = new Actor({
            pos: new Vector(engine.drawWidth / 2, 300),
            width: 150,
            height: 50,
            color: Color.Green,
        });

        // Add a label to the start button
        const mainMenuButtonText = new Label({
            text: 'Click to go back to main menu!',
            font: new Font({
                size: 20,
                color: Color.Black,
                bold: true,
                family: 'Arial',
            }),
        });

        // Center the button text within the button
        mainMenuButtonText.anchor = new Vector(0.5, 0.5)
        mainMenuButton.addChild(mainMenuButtonText);

        mainMenuButton.on('pointerup', () => {
            engine.goToScene('start');
        });

        // Add the title and start button to the scene
        this.add(title);
        this.add(waveScore);
        this.add(mainMenuButton);

        console.log(engine.waveCount) //Put wavecount here
    }
}