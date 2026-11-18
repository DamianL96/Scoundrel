import * as Phaser from 'phaser';
import { CardView } from './CardView';
import { Weapon } from '../domain/Weapon';
import { CardButton } from './CardButton';

export class WeaponView{
    private weaponCardView: CardView | null = null;
    private lastDefeatedView: CardView | null = null;
    private clickCallback: (()=>void) | null = null;
    private emptySlot: CardButton | null = null;

    constructor(
        private scene: Phaser.Scene,
        private x:number,
        private y:number,
        private spacing:number= 110
    ){}

    onWeaponClicked(callback:()=>void):void{
        this.clickCallback = callback;
    }

    render( weapon: Weapon | null): void{
        this.clear();

        if(!weapon){
            this.emptySlot = new CardButton(this.scene, this.x, this.y, 'Sin\nArma', false);
            this.emptySlot.setAlpha(0.4);
            return;
        }

        this.weaponCardView = new CardView( this.scene, this.x, this.y, weapon.getWeapon(), true);
        this.weaponCardView.on('clicked',()=>this.clickCallback?.());

        const lastDefeated = weapon.getLastMonsterDefeated();
        if(lastDefeated){
            this.lastDefeatedView = new CardView (this.scene, (this.x+120), this.y, lastDefeated, false);
        }
    }

    private clear(){
        this.weaponCardView?.destroy();
        this.emptySlot?.destroy();
        this.lastDefeatedView?.destroy();
        this.weaponCardView = null;
        this.emptySlot = null;
        this.lastDefeatedView = null;
    }

    getWeaponCardView(): CardView | null{
        return this.weaponCardView;
    }

    showInvalidAttack():void{
        if(!this.lastDefeatedView) return;

        const card = this.lastDefeatedView;

        this.scene.tweens.add({
            targets:card,
            x: card.x + 8,
            duration:60,
            yoyo: true, repeat: 2,
            ease: 'Sine.easeInOut'
        });
    }
}