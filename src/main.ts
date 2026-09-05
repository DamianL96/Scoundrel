import { GameSession } from './domain/Game';
import StartGame from './game/main';
import { testPlayer } from './debug/scenarios';
import { MainScene } from './scenes/MainScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: '#2d2d2d',
    parent: 'app', //id del div en index.html donde aparece el canvas
    scene: [MainScene]
};

new Phaser.Game(config);

/*
document.addEventListener('DOMContentLoaded', () => {

    StartGame('game-container');
    //const game = new Game();
    //game.start();
    testPlayer();

});*/