import { Card } from "./Card";

export class Weapon{
    private lastMonsterDefeated: Card | null = null;

    constructor( readonly weapon: Card){}

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
}