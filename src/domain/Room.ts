import { Card } from "./Card";

export class Room{
    private cards: Card[] = [];
    private fullRoom: number = 4;
    private reloadMin: number = 1;
    
    addCard(card: Card): void{
        this.cards.push(card);
    }

    removeCard(card: Card): void{
        let indice= this.cards.indexOf(card);
        this.cards.splice(indice, 1); //comprobar que el indice no sea negativo
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