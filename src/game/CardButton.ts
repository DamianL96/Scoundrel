import { Suit } from "../domain/enums/Suit";
import * as Phaser from 'phaser';

export class CardButton extends Phaser.GameObjects.Container{
    protected rectangulo: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, x: number, y: number, label: string, interactive: boolean = true, textureKey?: string) {
        super(scene, x, y);

        const hasImage = textureKey !== undefined && scene.textures.exists(textureKey);
        
        this.rectangulo = scene.add.rectangle(0, 0, 90, 130, 0xffffff, hasImage? 0:1 ).setStrokeStyle(2, 0x000000);

        if (interactive) {
            this.rectangulo.setInteractive({ useHandCursor: true });
            this.rectangulo.on('pointerdown', () => this.emit('clicked'));
        }

        if (hasImage) {
            const image = scene.add.image(0, 0, textureKey!).setDisplaySize(90, 130);
            this.add([image, this.rectangulo]);
            
        } else {
            const text = scene.add.text(0, 0, label, {
                fontSize: '18px',
                color: '#000000',
                align: 'center'
            }).setOrigin(0.5);
            this.add([this.rectangulo, text]);
        }
        


       
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