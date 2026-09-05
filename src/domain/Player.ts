import { Card } from "./Card";
import { FightResult } from "./interfaces/FightResult";
import { Weapon } from "./Weapon";

export class Player{
    private health: number = 20;
    private weapon: Weapon | null= null;

    getHealth(): number{
        return this.health;
    }

    heal(heal:number): void{ //Comprobar que no cure mas de 20 puntos
        let comprobacion = this.health + heal;
        if( (comprobacion) > 20 ){
            this.health = 20;
        }else{
            this.health += heal;
        }
    }

    private applyDamage( damage: number): void{
        this.health = Math.max(0, this.health - damage);
    }

    isDead(): boolean{ return this.health <= 0; }    
    getWeapon(): Weapon | null{ return this.weapon; }
    hasWeapon():boolean{ return this.weapon !== null; }
    equipWeapon(weapon: Card):void{ this.weapon= new Weapon(weapon); }

    fightBareHanded(monster: Card):FightResult{
        this.applyDamage(monster.value);
        return{
            success: true,
            damageReceived:monster.value,
            playerDead:this.isDead()
        }
    }

    fightWithWeapon(monster:Card):FightResult{
        if(!this.weapon || !this.weapon.canDefeat(monster)){//si el arma no mata al monstruo, no la puede jugar
            return { //crear un identificador para comparar mas facil cuando y por que el resultado
                success: false,
                damageReceived: 0,
                playerDead: this.isDead()
            }
        }

        const damage = Math.max(0, monster.value - this.weapon.getValue());
        this.applyDamage(damage);
        this.weapon.updateLastMonster(monster);
        
        return {
            success: true,
            damageReceived: damage,
            playerDead: this.isDead()
        }
    }
       
}