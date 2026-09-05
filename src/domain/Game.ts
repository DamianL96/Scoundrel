import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Room } from "./Room";
import { FightResult } from "./interfaces/FightResult";


export class Game{
    readonly player: Player;
    readonly deck: Deck;
    readonly room: Room;
    private canEscapeFlag: boolean= true;
    
    //podemos enviar datos por parametros para testear
    constructor(player?: Player, deck?: Deck, room?: Room){
        this.player = player?? new Player();
        this.deck = deck?? new Deck();
        this.room = room?? new Room();
    }

    start(): void{
        //llenar habitacion
        this.loadRoom();
        //hasta aca funciona
        
        
    }

    playCard(card: Card, useWeapon:boolean=false):void{
        if(card.isMonster()){
            const result= this.fight(card,useWeapon); //hay que pasarle si usa o no el arma (si la tiene equipada)

            if(result.success){
                this.onCardRemovedFromRoom();
            }

        }else if(card.isPotion()){
            this.player.heal(card.value);
            this.room.playCard(card); //retiramos la carta del room
            this.onCardRemovedFromRoom();

        }else if(card.isWeapon()){
            this.player.equipWeapon(card);
            this.room.playCard(card); //retiramos la carta del room
            this.onCardRemovedFromRoom();
        }
    }

    private onCardRemovedFromRoom():void{ //cada vez que se saca una carta de Room
        if(this.room.getCards().length === 0){
            this.canEscapeFlag = true;
            this.loadRoom();
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
        }
    }

    fight( monster: Card, useWeapon:boolean):FightResult{
        const result = useWeapon
            ? this.player.fightWithWeapon(monster)
            : this.player.fightBareHanded(monster);

        if(result.success){
            //si derrotamos al monstruo
            this.room.playCard(monster);//retiramos la carta del room
        }

        //si result.succes es false con useWeapon true significa 
        //que no podemos derrotar al monstruo con el arma equipada

        //podemos analizar el resultado acá o en la funcion que llame fight()
        return result;
    }


    canEscape():boolean{
        return this.canEscapeFlag;
    }

    resetCanEscape(){
        this.canEscapeFlag= true;
    }

    //TESTEAR FUNCION
    escapeRoom(){ 
        if (!this.canEscapeFlag) return;

        const escapeRoom = this.room.getCards();//implementar que se pueda escapar juntando cartas de un lado o de otro.
        
        this.deck.addCards(escapeRoom);
        this.room.cleanRoom();
        this.canEscapeFlag= false;
    }
   
    points():number{
        let points:number=0;
        let copy= this.deck.getRemainingCards();
        if(!this.player.isDead()){
            points = this.player.getHealth();
            
            while(copy.length > 0 ){
                let card= copy.pop();
                if(card?.isPotion()){
                    points += card.value;
                }
            }
            return points;
        }

        
        while(copy.length > 0 ){
            let card= copy.pop();
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

    hasLost():boolean{
        return this.player.isDead();
    }

}