import { use } from "matter";
import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Room } from "./Room";
import { FightResult } from "./interfaces/FightResult";


export class Game{
    readonly player: Player;
    readonly deck: Deck;
    readonly room: Room;
    private escapes: boolean= false;
    

    constructor(){
        this.player = new Player();
        this.deck = new Deck();
        this.room = new Room();
    }

    start(): void{
        //llenar habitacion
        this.loadRoom();
        //hasta aca funciona
        
        
    }

    playCard(card: Card, useWeapon:boolean=false):void{
        if(card.isMonster()){
            this.fight(card,useWeapon); //hay que pasarle si usa o no el arma (si la tiene equipada)
        }
        if(card.isPotion()){
            this.player.heal(card.value);
        }
        if(card.isWeapon()){
            this.player.equipWeapon(card);
        }
    }

    loadRoom(){
        //puede recargar?
        //está lleno?
        if(this.room.canReload()){
            while(!this.room.isFull()){
                //sacamos del mazo y pasamos al room
                
                let card= this.deck.drawCard();
                if(card === null){
                    break;
                }
                this.room.addCard(card);
            }
            this.escapes= false;
        }
    }

    fight( monster: Card, useWeapon:boolean):FightResult{
        const result = useWeapon
            ? this.player.fightWithWeapon(monster)
            : this.player.fightBareHanded(monster);

        if(result.success){
            //si derrotamos al monstruo
        }

        //si result.succes es false con useWeapon true significa 
        //que no podemos derrotar al monstruo con el arma equipada

        //podemos analizar el resultado acá o en la funcion que llame fight()
        return result;
    }

    //TESTEAR FUNCION
    escapeRoom(){ //implementar que se pueda escapar juntando cartas de un lado o de otro.
        if (!this.escapes) {
            const escapeRoom = this.room.getCards();
            console.log(escapeRoom);
            this.deck.addCards(escapeRoom);
            this.room.cleanRoom();
            this.loadRoom(); //se modifica el valor de escapes=false en loadRoom pero se sobrescribe debajo
            this.escapes= true;
        }
    }
   
    points():number{
        let points:number=0;
        
        if(!this.player.isDead()){
            points = this.player.getHealth();
            while(!this.deck.isEmpty()){
                let card= this.deck.drawCard();
                if(card?.isPotion()){
                    points += card.value;
                }
            }
            return points;
        }

        
        while(!this.deck.isEmpty()){
            let card= this.deck.drawCard();
            if(card?.isMonster()){
                points -= card.value;
            }
        }
        return points;
    }


    hasWon():boolean{
        if(this.deck.isEmpty()){
            if(!this.room.hasMonsters() && !this.player.isDead()){
                return true;
            }
        }
        return false;
    }

}