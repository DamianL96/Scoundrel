import { Card } from "./Card";
import { Suit } from "./enums/Suit";

export class Deck{
    private cards: Card[] = [];
    private static readonly MIN_VALUE = 2;
    private static readonly MAX_RED_VALUE = 10;
    private static readonly MAX_BLACK_VALUE = 14;
    

    constructor(shuffled: boolean = true){
        this.createDeck();
        if(shuffled) this.shuffle(); 
    }

    private createDeck(){
        //crear el mazo de 44 cartas sin comodines ni A,J,Q,K rojas
        this.cards= this.cards.concat(this.createCardsInRange(Suit.HEART,Deck.MIN_VALUE,Deck.MAX_RED_VALUE));
        this.cards= this.cards.concat(this.createCardsInRange(Suit.DIAMOND,Deck.MIN_VALUE,Deck.MAX_RED_VALUE));
        this.cards= this.cards.concat(this.createCardsInRange(Suit.CLUBS,Deck.MIN_VALUE,Deck.MAX_BLACK_VALUE));
        this.cards= this.cards.concat(this.createCardsInRange(Suit.SPADES,Deck.MIN_VALUE,Deck.MAX_BLACK_VALUE));
    }
    private shuffle(){
        //barajar
        for(let i = this.cards.length-1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; ///destructuracion para cambiar los indices
        }
    }

    private createCardsInRange(suit:Suit, minValue:number,maxValue:number):Card[]{
        const cards: Card[]=[];

        for(let i = minValue; i <= maxValue; i++){
            cards.push(new Card(suit,i));
        }

        return cards;
    }

    drawCard():Card | null{
        let card= this.cards.pop(); 

        if(card === undefined) return null;
        return card;
    }

    isEmpty():boolean{
        return this.cards.length <=0 ? true : false;
    }

    addCards(cartas:Card[]){
        this.cards.unshift(...cartas);
    }

    getRemainingCards():Card[]{
        return [...this.cards];
    }
}