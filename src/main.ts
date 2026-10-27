
import { GameOverScene } from './scenes/GameOverScene';
import { MainScene } from './scenes/MainScene';
import * as Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1440,
    height: 800,
    backgroundColor: '#e43333',
    parent: 'app', //id del div en index.html donde aparece el canvas
    scene: [MainScene, GameOverScene]
};

new Phaser.Game(config);
