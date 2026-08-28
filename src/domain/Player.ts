import { Card } from "./Card";
import { Weapon } from "./Weapon";

export class Player{
    private healt: number = 20;
    private weapon: Weapon | null= null;

    getHealt(): number{
        return this.healt;
    }

    takeDamage(damage: number): void{// si el jugador tiene un arma equipada se calcula el daño
        
        this.healt -= damage;

        if(this.healt <= 0){
            console.log("Perdiste!");
        }
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
    takeDamageWithWeapon(damage: number):void{
        if(this.weapon){ //si hay arma se calcula el daño que recibo
            damage -= this.weapon.getValue();
        }
        if(damage <= 0) return; 
                
        this.healt -= damage; //restamos el daño a la vida
        if( this.healt <= 0){ //si nos quedamos sin vida perdemos
                console.log("Perdiste!");
        }
        
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