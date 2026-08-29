import { Card } from "./Card";
import { Suit } from "./enums/Suit";

export class Room{
    private cards: Card[] = [];
    private fullRoom: number = 4;
    private reloadMin: number = 1;
    //private emptyCard: Card = new Card (Suit.EMPTY,0);
    
    addCard(card: Card): void{
        this.cards.push(card);
        console.log(this.cards);
    }

    removeCard(card: Card): Card{
        let indice= this.cards.indexOf(card);
        return this.cards.splice(indice, 1)[0]; //reemplaza la carta por una vacía
    }

    getCards(): Card[]{
        return[...this.cards];
    }

    canReload():boolean{ //comprueba que quede una sola carta en la habitación para poder rellenarla de nuevo
        return this.cards.length <= this.reloadMin ? true:false;
    }

    isFull():boolean{ //compreueba si la sala está llena
        return this.cards.length == this.fullRoom ? true:false;
    }
    
}