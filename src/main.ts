import { Deck } from './domain/Deck';
import StartGame from './game/main';

document.addEventListener('DOMContentLoaded', () => {

    StartGame('game-container');
    const deck = new Deck();
    console.log(deck);

});