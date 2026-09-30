import * as Phaser from 'phaser';
import { GameSession } from '../domain/GameSession';
import { Card } from '../domain/Card';
import { RoomView } from '../game/RoomView';

export class MainScene extends Phaser.Scene{

    private gameSession!: GameSession;
    private roomView!: RoomView;
    private healthText: Phaser.GameObjects.Text;

    constructor(){
        super({key:'MainScene'});
    }

    create():void{

        this.gameSession = new GameSession();
        this.gameSession.start();

        this.healthText = this.add.text(20, 20, '', { fontSize:'24', color: '#ffffff'});

        this.roomView = new RoomView( this, 300);

        this.events.on('card-clicked', (card: Card)=> this.onCardClicked(card));//que hace esto?

        this.render();
    }

    private render(): void{
        this.roomView.render(this.gameSession.room.getCards());
        this.updateHealthText();
    }

    private onCardClicked(card: Card): void{ //si la carta es un mosntruo y tiene arma, juega la carta y redibuja la pantalla
        const useWeapon = card.isMonster() && this.gameSession.player.hasWeapon();
        this.gameSession.playCard(card, useWeapon);
        this.render();
    }

    private updateHealthText():void{ //toma la vida del jugador y la dibuja
        this.healthText.setText(`Vida: ${this.gameSession.player.getHealth()}`);
    }

}