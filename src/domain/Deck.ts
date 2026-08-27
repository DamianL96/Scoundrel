import { Card } from "./Card";
import { Suit } from "./enums/Suit";

export class Deck{
    private cards: Card[] = [];

    constructor(){
        this.createDeck();
        //this.shuffle();
    }

    private createDeck(){
        //crear el mazo de 44 cartas sin comodines ni A,J,Q,K rojas
        this.cards= this.cards.concat(this.createBlackCards(Suit.SPADES));
        this.cards= this.cards.concat(this.createBlackCards(Suit.CLUBS));
        this.cards= this.cards.concat(this.createRedCards(Suit.DIAMOND));
        this.cards= this.cards.concat(this.createRedCards(Suit.HEART));

        this.cards= this.shuffle();
    }
    private shuffle():Card[]{
        //barajar
        const copia = [...this.cards];
        for(let i = copia.length-1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1));
            [copia[i], copia[j]] = [copia[j], copia[i]]; ///destructuracion para cambiar los indices
        }
        return copia;
    }

    draw(): Card | undefined{
        return this.cards.pop();
    }

    private createRedCards(suit:Suit):Card[]{
        let redDeck: Card[] = [];
        let i = 2;
        while(i < 11){
            let card = new Card(suit, i);
            redDeck.push(card);
            i++;
        }
        return redDeck;
    }
    private createBlackCards(suit:Suit) :Card[]{
        //A 2-10 J, Q, K 13 cartas
        let blackDeck:Card[] = [];
        let i = 1;
        while(i < 14){
            let card = new Card(suit,i);
            blackDeck.push(card);
            i++;
        }
        
        return blackDeck;
    }
}