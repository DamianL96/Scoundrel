import { Game } from './domain/Game';
import StartGame from './game/main';
import { testPlayer } from './debug/scenarios';

document.addEventListener('DOMContentLoaded', () => {

    StartGame('game-container');
    //const game = new Game();
    //game.start();
    testPlayer();

});