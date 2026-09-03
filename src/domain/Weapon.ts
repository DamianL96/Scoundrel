import { Card } from "./Card";

export class Weapon{
    private lastMonsterDefeated: Card | null = null;
    private weapon: Card;

    constructor( card: Card){
        this.weapon = card;
    }

    canDefeat(monster: Card):boolean{
        if(this.lastMonsterDefeated === null){
            return true;
        }
        return monster.value < this.lastMonsterDefeated.value; //el monstruo debe ser menor al anterior derrotado
    }

    getLastMonsterDefeated(){
        return this.lastMonsterDefeated;
    }

    updateLastMonster(monster: Card):void{
        this.lastMonsterDefeated= monster;
    }

    getWeapon():Card{
        return this.weapon;
    }

    getValue():number{
        return this.weapon.value;
    }
}