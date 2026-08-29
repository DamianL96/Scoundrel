import { Card } from "./Card";
import { Weapon } from "./Weapon";

export class Player{
    private healt: number = 20;
    private weapon: Weapon | null= null;

    getHealt(): number{
        return this.healt;
    }

    fight(damage: number): boolean{// si el jugador tiene un arma equipada se calcula el daño
        
        this.healt -= damage;

        return this.isDead(); //podria devolver isdead() como booleano
    }

    /*takeDamageWithWeapon(damage: number):void{
        if(this.weapon == null){
            this.healt -= damage;
        }else{
            damage -= this.weapon.getValue();
            if(damage >= this.healt){
                console.log("Perdiste!");
            }else{
                if(damage > 0){
                    this.healt -= damage;
                }
            }
            
        }
    }*/

    //refactor
    fightWithWeapon(monsterStats: Card):boolean{
        if(!this.weapon?.canDefeat(monsterStats)) return false;// deberia devolver algo diferente

        let damage = monsterStats.value;
        
        if(this.weapon){ //si hay arma se calcula el daño que recibo
            
            damage -= this.weapon.getValue();
        }
                
        this.healt -= damage; //restamos el daño a la vida
        return this.isDead();
        
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


    equipWeapon(weapon: Card):void{
        //si hay otro arma equipada descartarla junto a los enemigos
        this.weapon= new Weapon(weapon);
    }

    isWeaponEquiped():boolean{
        return this.weapon !== null ? true : false; 
    }

    
}