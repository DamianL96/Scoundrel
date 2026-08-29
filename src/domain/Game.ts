import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Room } from "./Room";

export class Game{
    readonly player: Player;
    readonly deck: Deck;
    readonly room: Room;

    

    constructor(){
        this.player = new Player();
        this.deck = new Deck();
        this.room = new Room();


    }

    start(): void{
        
        console.log(this.deck);
        //llenar habitacion
        this.loadRoom();
        console.log(this.room);
        console.log(this.deck);
        //hasta aca funciona

        
    }
    
    selectCard(){

    }

    /*playCard(card: Card):void{
        if(card.isMonster()){
            this.player.takeDamage(card.value);
        }
        if(card.isPotion()){
            this.player.heal(card.value);
        }
    }*/

    loadRoom(){
        //puede recargar?
        //está lleno?
        if(this.room.canReload()){
            while(!this.room.isFull()){
                //sacamos del mazo y pasamos al room
                let card= this.deck.getCard();
                this.room.addCard(card);
            }
        }
    }

}