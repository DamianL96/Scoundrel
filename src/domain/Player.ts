import { Card } from "./Card";

export class Player{
    private healt: number = 20;
    private weapon: Card | null= null;

    getHealt(): number{
        return this.healt;
    }

    takeDamage(damage: number): void{
        this.healt -= damage;
    }

    heal(heal:number): void{ //Comprobar que no cure mas de 20 puntos
        let comprobacion = this.healt + heal;
        if( (comprobacion) > 20 ){
            this.healt = 20;
        }else{
            this.healt += heal;
        }
    }

    isDead(): boolean{
        return this.healt <= 0;
    }

    getWeapon():Card|null{
        return this.weapon;
    }

    equipWeapon(weapon: Card):void{
        //si hay otro arma equipada descartarla junto a los enemigos
        this.weapon= weapon;
    }
}