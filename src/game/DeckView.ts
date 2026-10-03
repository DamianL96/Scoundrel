import * as Phaser from 'phaser';

export class DeckView{
    private rectangle: Phaser.GameObjects.Rectangle;
    private countText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x:number, y:number){
        this.rectangle= scene.add.rectangle(x, y, 90, 130, 0x1b3a5c).setStrokeStyle(2, 0x000000);
        this.countText = scene.add.text(x, y, '', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }

    render(remainingCards: number):void{
        this.countText.setText(`${remainingCards}`);
    }
}