import '../css/style.css';
import { Actor, Engine, Scene, Vector, Label, Color, Font } from 'excalibur';

export class GameOver extends Scene {
    onInitialize(engine) {
        const title = new Label({
            text: 'Game Over',
            pos: new Vector(engine.drawWidth / 2, 100),
            font: new Font({
                size: 40,
                color: Color.White,
                family: 'Arial',
            })
        });
        title.anchor = new Vector(0.5, 0.5)

        const waveScore = new Label({
            text: `You got to wave ${engine.waveCount}`,
            pos: new Vector(engine.drawWidth / 2, 200),
            font: new Font({
                size: 30,
                color: Color.White,
                family: 'Arial',
            })
        });
        waveScore.anchor = new Vector(0.5, 0.5)

        // Create and configure the start button
        const restartButton = new Actor({
            pos: new Vector(engine.drawWidth / 2 - 120, 300),
            width: 150,
            height: 50,
            color: Color.Green,
        });

        const quitButton = new Actor({
            pos: new Vector(engine.drawWidth / 2 + 120, 300),
            width: 150,
            height: 50,
            color: Color.LightGray,
        });

        // Add a label to the start button
        const restartButtonText = new Label({
            text: 'Restart',
            font: new Font({
                size: 20,
                color: Color.Black,
                bold: true,
                family: 'Arial',
            }),
        });

        const quitButtonText = new Label({
            text: 'Quit',
            font: new Font({
                size: 20,
                color: Color.Black,
                bold: true,
                family: 'Arial',
            }),
        });

        // Center the button text within the button
        restartButtonText.anchor = new Vector(0.5, 0.5)
        restartButton.addChild(restartButtonText);

        quitButtonText.anchor = new Vector(0.5, 0.5)
        quitButton.addChild(quitButtonText);

        restartButton.on('pointerup', () => {
            engine.goToScene('level');
        });

        quitButton.on('pointerup', () => {
            engine.goToScene('start');
        });


        // Add the title and start button to the scene
        this.add(title);
        this.add(waveScore);
        this.add(restartButton);
        this.add(quitButton);

        console.log(engine.waveCount) //Put wavecount here
    }
}