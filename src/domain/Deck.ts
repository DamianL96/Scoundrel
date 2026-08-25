import { Card } from "./Card";

export class Deck{
    private cards: Card[] = [];

    constructor(){
        this.createDeck();
        this.shuffle();
    }

    private createDeck(){
        //crear las cartas
    }
    private shuffle(){
        //barajar
    }

    draw(): Card | undefined{
        return this.cards.pop();
    }
}