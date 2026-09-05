import Phaser from 'phaser';

export class MainScene extends Phaser.Scene{

    constructor(){
        super({key:'MainScene'});
    }

    create():void{
        this.add.rectangle(400,300,100, 140,0xffffff);
        this.add.text(400, 450, 'Scoundrel',{
            fontSize:'32ox',
            color:'#ffffff'
        }).setOrigin(0.5);
    }
}