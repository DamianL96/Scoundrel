import * as Phaser from 'phaser';
import { GameSession } from '../domain/GameSession';
import { Card } from '../domain/Card';
import { RoomView } from '../game/RoomView';
import { CardButton } from '../game/CardButton';
import { DeckView } from '../game/DeckView';
import { WeaponView } from '../game/WeaponView';
import { cardTextureKey } from '../game/cardTextures';
import { Suit } from '../domain/enums/Suit';

export class MainScene extends Phaser.Scene{

    private gameSession!: GameSession;
    private roomView!: RoomView;
    private healthText: Phaser.GameObjects.Text;
    private selectedMonster: Card | null = null;
    
    private bareHandedButton: CardButton;
    private escapeButton: CardButton;

    private deckView: DeckView;
    private weaponView: WeaponView;
    private isGameOver: boolean = false;

    private isAnimating: boolean = false;

    constructor(){
        super({key:'MainScene'});
    }

    preload():void{
        const available: Card[]=[
            new Card(Suit.HEART, 3),
            new Card(Suit.HEART, 4),
            new Card(Suit.HEART, 5),
            new Card(Suit.HEART, 6),
            new Card(Suit.HEART, 7),
            new Card(Suit.HEART, 8),
            new Card(Suit.HEART, 9),
            new Card(Suit.HEART, 10),
        ];
        available.forEach(card=>{
            const key = cardTextureKey(card);
            this.load.image(key, `assets/cards/${key}.png`);
        })
        
    }

    create():void{

        this.isGameOver = false;
        this.selectedMonster = null;

        this.gameSession = new GameSession();
        this.gameSession.start();

        this.healthText = this.add.text(20, 20, '', { fontSize:'24px', color: '#ffffff'});

        this.roomView = new RoomView( this, 300);
        this.roomView.onCardClicked(card => this.handle(() => this.onCardClicked(card)));

        this.bareHandedButton = new CardButton( this, 690, 500, 'A puño \nlimpio');
        this.bareHandedButton.on('clicked', () => this.onBareHandClicked());

        this.weaponView= new WeaponView(this, 800, 500);
        this.weaponView.onWeaponClicked(() => this.onWeaponSlotClicked());

        this.escapeButton = new CardButton( this, 1180, 300, 'Huir');
        this.escapeButton.on('clicked', ()=> this.handle ( () => this.onEscapeClicked()));

        this.deckView = new DeckView(this, 80, 150);

        this.deckView.onDeckClicked(()=> this.handle ( () => this.onDeckClicked()));

        this.render();
    }

    private render(): void{
        this.roomView.render(this.gameSession.room.getCards(), this.selectedMonster);
        this.updateHealthText();

        this.deckView.render(this.gameSession.deck.getRemainingCards().length, this.gameSession.room.canReload());
        this.weaponView.render(this.gameSession.player.getWeapon());
        this.escapeButton.setEnabled(this.gameSession.canEscape());
        this.checkGameOver();
    }

    private updateHealthText():void{ //toma la vida del jugador y la dibuja
        this.healthText.setText(`Vida: ${this.gameSession.player.getHealth()}`);
    }


    private onCardClicked(card: Card): void{
        if(card.isMonster()){
            this.selectedMonster = card;
            return;
        }

        if(card.isPotion()){
            this.startHeal(card);
            return;
        }
        //si no es pocion ni monstruo es un arma que se equipa
        this.startEquip(card);
    }



    private onBareHandClicked(): void{
        if(!this.selectedMonster) return;
        this.startAttack(this.bareHandedButton, false);
    }

    private onWeaponSlotClicked():void{
        if(!this.selectedMonster || !this.gameSession.player.hasWeapon()) return;

        const weaponCard = this.weaponView.getWeaponCardView();
        if(!weaponCard) return;
        
        this.startAttack(weaponCard, true);
    }

    private onDeckClicked():void{
        if(!this.gameSession.room.canReload()) return;
        this.gameSession.loadRoom();
    }

    private onEscapeClicked():void{
        if(!this.gameSession.canEscape()) return;
        this.gameSession.escapeRoom();
        this.selectedMonster = null;
    }

    private checkGameOver():void{
        if(this.isGameOver)return;
        if(!this.gameSession.hasWon() && !this.gameSession.hasLost()) return;

        this.isGameOver = true;

        this.time.delayedCall(1000, ()=>{
            this.scene.start('GameOverScene',{
                won: this.gameSession.hasWon(),
                points: this.gameSession.points()
            })
        })
    }

    private handle(action:()=>void):void{
        if(this.isGameOver || this.isAnimating)return;

        const previousHealth= this.gameSession.player.getHealth();
        action();

        if(this.isAnimating)return;

        const currentHealth= this.gameSession.player.getHealth(); 
        this.render();

        if(previousHealth !== currentHealth){
            this.animateHealtChange(previousHealth, currentHealth);
        }
    }

    private playDamageEffect(): void{
        const camera = this.cameras.main;

        camera.shake(280, 0.002); //verificar la cantidad de daño y cambiar efecto por la cantidad de daño
        //100 duracion en milisegundos, 0.002 intensidad de sacudida
        camera.flash(200, 255, 40, 40);
    }

    private animateHealtChange(previousHealt: number, currentHealth: number):void{
        const counter = { value:previousHealt };

        this.healthText.setText(`Vida: ${previousHealt}`);

        this.tweens.add({
            targets:counter,
            value:currentHealth,
            duration:450,
            ease:'Cubic.easeOut',
            onUpdate:()=>{
                this.healthText.setText(
                    `Vida: ${Math.round(counter.value)}`
                );
            },
            onComplete:()=>{
                this.healthText.setText(`Vida: ${currentHealth}`);
            }
        });

        if(currentHealth < previousHealt){
            this.playDamageEffect();
            this.healthText.setTint(0xff5555); //se pone rojo
        }
        if(currentHealth !== previousHealt){
            this.time.delayedCall(500, ()=>{
                this.healthText.clearTint();
            })
        }
    }

    //realiza las animaciones del ataque
    private startAttack( attacker: CardButton, useWeapon:boolean): void{
        
        if(!this.selectedMonster || this.isAnimating || this.isAnimating) return;

        const monster= this.selectedMonster;

        if(useWeapon && !this.gameSession.canFightWithWeapon(monster)){
            this.weaponView.showInvalidAttack();
            return;
        }//si el arma no puede derrotar al monstruo

        const target= this.roomView.getCardPosition(monster); 

        if(!target) return;

        this.isAnimating = true;
        
        attacker.animateAttack(
            
            target.x, target.y,
            
            //al impactar
            ()=>{
                this.roomView.playHittEffect(monster);
            },

            //cuando termina la animacion
            ()=>{
                this.isAnimating = false;

                this.handle(()=>{
                    this.gameSession.playCard(monster, useWeapon);
                    this.selectedMonster = null;
                });
            }
        );
    }

    private startHeal(card: Card):void{
        if(this.isAnimating)return;

        const cardView= this.roomView.getCardView(card);

        if(!cardView)return;

        this.isAnimating= true;

        const targetX = 80;
        const targetY = 30;

        cardView.animateHeal(targetX,targetY, ()=>{
            
            const previousHealt= this.gameSession.player.getHealth();

            this.isAnimating= false;
        
            this.handle(()=>{
                this.gameSession.playCard(card);
            });

            const currentHealth = this.gameSession.player.getHealth();
            if(currentHealth > previousHealt){
                this.playHealEffect();
            }
        });
    }

    private playHealEffect():void{
        
        this.tweens.killTweensOf(this.healthText);

        this.healthText.setTint(0x66ff88);

        this.tweens.add({
            targets:this.healthText,
            scaleX: 1.25, scaleY: 1.25,
            duration: 120,
            yoyo: true,
            ease: 'Back.Out',
            onComplete: ()=>{ this.healthText.setScale(1)}
        });
    }

    startEquip(card:Card):void{
        if(this.isAnimating)return;

        const cardView = this.roomView.getCardView(card);
        if(!cardView)return;

        const target = this.weaponView.getWeaponPosition();

        this.isAnimating = true;
        
        cardView.animateEquip(target.x, target.y, () => {
            
            this.weaponView.animateLastDefeatedExit(() => {
                
                this.isAnimating = false;

                this.handle(() => {
                    this.gameSession.playCard(card);
                });
            });
        });
    }
}