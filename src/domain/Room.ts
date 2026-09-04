import { Card } from "./Card";
import { Suit } from "./enums/Suit";

export class Room{
    private cards: Card[] = [];
    private fullRoom: number = 4;
    private reloadMin: number = 1;
    
    addCard(card: Card): void{
        if(!this.isFull()){
            this.cards.push(card);
        }        
    }

    playCard(card: Card): Card | null{
        console.log(card);
        const indice= this.cards.findIndex(c => c.equals(card));
        
        if(indice === -1) return null; //si la carta no esta en la habitacion
        
        return this.cards.splice(indice, 1)[0]; //retira la carta del mazo
    }

    getCards(): Card[]{
        return this.cards;
    }

    getRemainingCards():Card[]{
        return [...this.cards];
    }

    canReload():boolean{ //comprueba que quede una sola carta en la habitación para poder rellenarla de nuevo
        return this.cards.length <= this.reloadMin ? true:false;
    }

    isFull():boolean{ //compreueba si la sala está llena
        return this.cards.length == this.fullRoom ? true:false;
    }

    cleanRoom(){
        this.cards = [];//se deberia hacer de otra forma quiza
    }

    hasMonsters():boolean{
        let monster= false;
        for(let i = 0; i < this.cards.length; i++){
            if(this.cards[i].isMonster()){
                monster = true;
            }
        }
        return monster;
    }
    
}