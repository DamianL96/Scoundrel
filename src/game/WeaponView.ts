import * as Phaser from 'phaser';
import { CardView } from './CardView';
import { Weapon } from '../domain/Weapon';

export class WeaponView{
    private weaponCardView: CardView | null = null;
    private lastDefeatedView: CardView | null = null;

    constructor(
        private scene: Phaser.Scene,
        private x:number,
        private y:number,
        private spacing:number= 110
    ){}

    render( weapon: Weapon | null): void{
        this.clear();

        if(!weapon)return;

        this.weaponCardView = new CardView( this.scene, this.x, this.y, weapon.getWeapon(), false);

        const lastDefeated = weapon.getLastMonsterDefeated();
        if(lastDefeated){
            this.lastDefeatedView = new CardView (this.scene, (this.x+120), this.y, lastDefeated, false);
        }
    }

    private clear(){
        this.weaponCardView?.destroy();
        this.lastDefeatedView?.destroy();
        this.weaponCardView = null;
        this.lastDefeatedView = null;
    }
}