import { Suit } from "../domain/enums/Suit";
import * as Phaser from 'phaser';

export class CardButton extends Phaser.GameObjects.Container{
    protected rectangulo: Phaser.GameObjects.Rectangle;

    constructor(scene:Phaser.Scene, x:number, y:number, label:string){
        super(scene, x, y);

       this.rectangulo = scene.add.rectangle(0, 0, 90, 130, 0xffffff).setStrokeStyle(2, 0x000000);
        const text = scene.add.text(0, 0, label,{
            fontSize: '18px',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5);

        this.rectangulo.setInteractive({ useHandCursor: true});
        this.rectangulo.on( 'pointerdown', ()=> this.emit('clicked'));

        this.add([this.rectangulo, text]);
        
        scene.add.existing(this);
    }

    setSelected(selected: boolean):void{
        this.rectangulo.setStrokeStyle(selected ? 4:2, selected? 0xffd700:0x000000);
    }
    
    setEnabled(enabled:boolean):void{
        this.setAlpha(enabled? 1:0.4); //hace transparente si esta deshabilitado
        if(enabled){
            this.rectangulo.setInteractive({ useHandCursor: true});
        }else{
            this.rectangulo.disableInteractive();
        }
    }

    private setSuit(suit: Suit):string{
        if(suit=== Suit.HEART)return '♥';
        if(suit=== Suit.DIAMOND)return '♦';
        if(suit=== Suit.CLUBS)return '♣';
        return '♠';
    }
}