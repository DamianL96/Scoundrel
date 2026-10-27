import * as Phaser from 'phaser';
import { CardButton } from '../game/CardButton';


interface GameOverData{
    won:boolean,
    points:number
}

export class GameOverScene extends Phaser.Scene{
    private result!: GameOverData;

    constructor(){
        super({key: 'GameOverScene'});
    }

    init(data: GameOverData):void{
        this.result = data;
    }

    create():void{
        const centerX = this.scale.width / 2;

        this.add.text(centerX, 200, this.result.won? 'Victoria' : 'Perdíste...',{
            fontSize: '48px',
            color: this.result.won? '#ffd700' : '#c0392b'
        }).setOrigin(0.5);

        this.add.text(centerX, 280, `Puntos: ${this.result.points}`, {
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const restartButton = new CardButton( this, centerX, 430, 'Jugar de\nnuevo');
        restartButton.on('clicked', ()=>this.scene.start('MainScene'));
    }
}