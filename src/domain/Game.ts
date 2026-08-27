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
        //iniciar partida
        //crear mazo y barajar (mezclar)
        //click en mazo para llenar habitacion
    }
    
    playCard(card: Card):void{
        if(card.isMonster()){
            this.player.takeDamage(card.value);
        }
        if(card.isPotion()){
            this.player.heal(card.value);
        }
    }
}