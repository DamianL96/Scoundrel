import * as Phaser from 'phaser';
import { GameSession } from '../domain/GameSession';
import { Card } from '../domain/Card';
import { RoomView } from '../game/RoomView';
import { CardButton } from '../game/CardButton';

export class MainScene extends Phaser.Scene{

    private gameSession!: GameSession;
    private roomView!: RoomView;
    private healthText: Phaser.GameObjects.Text;
    private selectedMonster: Card | null = null;
    
    private bareHandedButton: CardButton;
    private weaponSlotButton: CardButton;

    constructor(){
        super({key:'MainScene'});
    }

    create():void{

        this.gameSession = new GameSession();
        this.gameSession.start();

        this.healthText = this.add.text(20, 20, '', { fontSize:'24', color: '#ffffff'});

        this.roomView = new RoomView( this, 300);

        this.events.on('card-clicked', (card: Card)=> this.onCardClicked(card));//que hace esto?

        this.bareHandedButton = new CardButton( this, 300, 500, 'A puño \nlimpio');
        this.bareHandedButton.on('clicked', ()=> this.onBareHandClicked());

        this.weaponSlotButton = new CardButton( this, 420, 500, 'Arma');
        this.weaponSlotButton.on('clicked', ()=>this.onWeaponSlotClicked());

        this.render();
    }

    private render(): void{
        this.roomView.render(this.gameSession.room.getCards(), this.selectedMonster);
        this.updateHealthText();
        this.weaponSlotButton.setEnabled(this.gameSession.player.hasWeapon());
    }

    /*private onCardClicked(card: Card): void{ //si la carta es un mosntruo y tiene arma, juega la carta y redibuja la pantalla
        const useWeapon = card.isMonster() && this.gameSession.player.hasWeapon();
        this.gameSession.playCard(card, useWeapon);
        this.render();
    }*/

    private updateHealthText():void{ //toma la vida del jugador y la dibuja
        this.healthText.setText(`Vida: ${this.gameSession.player.getHealth()}`);
    }


    private onCardClicked(card: Card): void{
        if(card.isMonster()){
            this.selectedMonster = card;
            //dar feedback visual, resaltar la carta seleccionada
            this.render();
            return;
        }
        //pociones y armas se consumen o equipan automaticamente
        this.gameSession.playCard(card);
        this.render();
    }

    private onBareHandClicked(): void{
        if(!this.selectedMonster) return;

        this.gameSession.playCard(this.selectedMonster, false);
        this.selectedMonster = null;
        this.render();
    }

    private onWeaponSlotClicked():void{
        if(!this.selectedMonster) return;
        this.gameSession.playCard(this.selectedMonster, true);
        this.selectedMonster = null;
        this.render();
    }
}