import * as Phaser from 'phaser';

export class DeckView{
    private rectangle: Phaser.GameObjects.Rectangle;
    private countText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x:number, y:number){
        this.rectangle = scene.add.rectangle(x, y, 90, 130, 0x1b3a5c).setStrokeStyle(2, 0x000000);
        this.countText = scene.add.text(x, y, '', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.rectangle.setInteractive({ useHandCursor: true});
        this.rectangle.on('pointerdown', ()=> this.rectangle.emit('deck-clicked'));
    }

    render(remainingCards: number, canReload:boolean):void{
        this.countText.setText(`${remainingCards}`);
        this.rectangle.setAlpha(canReload ? 1:0.6);
    }

    onDeckClicked(callback: ()=>void):void{
        this.rectangle.on('deck-clicked', callback);
    }
}