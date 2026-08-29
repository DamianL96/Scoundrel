import { Card } from "./Card";
import { Suit } from "./enums/Suit";

export class Deck{
    private cards: Card[] = [];

    constructor(){
        this.createDeck();
        this.shuffle();
    }

    private createDeck(){
        //crear el mazo de 44 cartas sin comodines ni A,J,Q,K rojas
        this.cards= this.cards.concat(this.createRedCards(Suit.HEART));
        this.cards= this.cards.concat(this.createRedCards(Suit.DIAMOND));
        this.cards= this.cards.concat(this.createBlackCards(Suit.CLUBS));
        this.cards= this.cards.concat(this.createBlackCards(Suit.SPADES));
    }
    private shuffle(){
        //barajar
        for(let i = this.cards.length-1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; ///destructuracion para cambiar los indices
        }
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
        let i = 2;
        while(i < 15){
            let card = new Card(suit,i);
            blackDeck.push(card);
            i++;
        }
        
        return blackDeck;
    }

    getCard():Card{
        let card= this.cards.pop(); 
        if(card === undefined){
            return new Card(Suit.HEART,0);//si el mazo esta vacio mandamos un 0 de corazones, deberia manejarse de otra manera
        }else{
            return card;
        }
    }

    isEmpty():boolean{
        return this.cards.length <=0 ? true : false;
    }
}