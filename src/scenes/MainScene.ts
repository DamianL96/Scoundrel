import * as Phaser from 'phaser';
import { GameSession } from '../domain/GameSession';
import { Card } from '../domain/Card';

export class MainScene extends Phaser.Scene{

    private gameSession!: GameSession;
    private cardContainers: Phaser.GameObjects.Container[]= [];
    private healthText: Phaser.GameObjects.Text;

    constructor(){
        super({key:'MainScene'});
    }

    create():void{

        this.gameSession = new GameSession();
        this.gameSession.start();

        this.healthText = this.add.text(20, 20, '', { fontSize:'24', color: '#ffffff'});

       this.render();
    }

    private render(): void{
        this.clearRoom();
        this.drawRoom();
        this.updateHealthText();
    }

    private clearRoom(){
        this.cardContainers.forEach(container => container.destroy());
        this.cardContainers = [];
    }

    private drawRoom(): void{
        const cards = this.gameSession.room.getCards();
        const cardWidth = 100;
        const spacing = 20;
        const startX = 150;
        const y = 300;

        cards.forEach((card, index)=>{
            const x = startX + index * (cardWidth + spacing);
            const container = this.createCardContainer(card, x, y);
            this.cardContainers.push(container);
        });
    }

    private createCardContainer(card: Card, x:number, y:number): Phaser.GameObjects.Container {
        const rectangle= this.add.rectangle(x, y, 90, 130, 0xffffff).setStrokeStyle(2, 0x000000);
        const text= this.add.text(x, y, `${card.suit}\n${card.value}`,{
            fontSize:'18px',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5);

        rectangle.setInteractive({useHandCursor: true});
        rectangle.on('pointerdown',()=> this.onCardClicked(card));
        const container = this.add.container(x, y, [rectangle, text]);

        /*const container = this.add.container(x, y,[rectangle,text]); 
        container.setSize(90,130);
        container.setInteractive({useHandCursor: true});
        container.on('pointerdown',()=> this.onCardClicked(card));*/

        return container;
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