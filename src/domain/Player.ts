export class Player{
    private healt: number = 20;

    getHealt(): number{
        return this.healt;
    }

    takeDamage(damage: number): void{
        this.healt -= damage;
    }

    heal(heal:number): void{ //Comprobar que no cure mas de 20 puntos
        this.healt += heal;
    }

    isDead(): boolean{
        return this.healt <= 0;
    }
}