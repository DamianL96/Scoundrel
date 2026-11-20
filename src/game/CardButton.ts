import { Suit } from "../domain/enums/Suit";
import * as Phaser from 'phaser';

export class CardButton extends Phaser.GameObjects.Container{
    protected rectangulo: Phaser.GameObjects.Rectangle;

    private baseY:number;
    private hovered: boolean = false;
    private hoverEnabled: boolean = true;

    constructor(scene: Phaser.Scene, x: number, y: number, label: string, interactive: boolean = true, textureKey?: string) {
        super(scene, x, y);

        this.baseY = y; //guarda la posicion original de la carta (para la animacion del hover)

        const hasImage = textureKey !== undefined && scene.textures.exists(textureKey);
        
        this.rectangulo = scene.add.rectangle(0, 0, 90, 130, 0xffffff, hasImage? 0:1 ).setStrokeStyle(2, 0x000000);

        if (interactive) {
            this.rectangulo.setInteractive({ useHandCursor: true });
            this.rectangulo.on('pointerdown', () => this.emit('clicked'));
            this.rectangulo.on('pointerover',()=>this.animateHover(true));
            this.rectangulo.on('pointerout',()=>this.animateHover(false));
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

    private animateHover(active:boolean):void{
        if(!this.hoverEnabled)return;
        if(this.hovered === active) return;

        this.hovered = active;

        this.scene.tweens.killTweensOf(this);

        this.scene.tweens.add({
            targets:this,
            y:active ? this.baseY -8 : this.baseY,

            scaleX: active ? 1.02 : 1,
            scaleY: active ? 1.02 : 1,

            duration: active ? 130: 110,
            ease: active ? 'Back.Out' : 'Sine.Out'
        });
    }

    setInputEnabled(enabled: boolean):void{
        if(enabled){
            this.rectangulo.setInteractive({useHandCursor: true});
        }else{
            this.rectangulo.disableInteractive();
            this.hovered = false;
            this.scene.tweens.killTweensOf(this);
            this.setPosition(this.x, this.baseY);
            this.setScale(1);
        }
    }

    setBasePosition(y:number):void{
        this.baseY = y;
    }

    animateAttack(targetX:number, targetY:number, onImpact:()=>void, onComplete:()=>void):void{

        const originX = this.x;
        const originY = this.y;
        const originalRotation= this.rotation;
        const originalDepth = this.depth;

        this.setInputEnabled(false);
        this.setDepth(1000); //ponemos la carta encima de las demas

        this.scene.tweens.killTweensOf(this);

        // Configuración de la inclinación durante el golpe
        const direction = targetX >= originX ? 1 : -1;

        const attackRotation = direction * 0.45; //calcula la esquina con la que ataca
        const attackScaleX = 0.92;
        const attackScaleY = 1.12;

        // Coordenadas de la esquina superior izquierda
        const localX = direction * 45 * attackScaleX;
        const localY = -65 * attackScaleY;

        // Rotamos ese punto alrededor del centro de la carta
        const offsetX =
            localX * Math.cos(attackRotation) -
            localY * Math.sin(attackRotation);

        const offsetY =
            localX * Math.sin(attackRotation) +
            localY * Math.cos(attackRotation);

        // Posición del centro de la carta para que
        // su esquina superior izquierda alcance el objetivo
        const impactX = targetX - offsetX;
        const impactY = targetY - offsetY;

        const tweenRotation = direction * 0.12;

        this.hoverEnabled = false;
        this.hovered= false;

        //preparacion
        this.scene.tweens.add({
            targets:this, y:originY -35,
            scaleX:1.12, scaleY: 1.12,
            rotation: tweenRotation, duration:150,
            ease:'Sine.Out',
            
            
            onComplete: ()=>{
                //golpe
                this.scene.tweens.add({
                    targets:this, x:impactX, y:impactY,
                    rotation: attackRotation,
                    scaleX:attackScaleX, scaleY:attackScaleY,
                    duration:110,
                    ease:'Expo.In',

                    onComplete: ()=>{
                    //recuperacion
                        onImpact();
                        this.scene.tweens.add({
                            targets:this, x:originX, y:originY,
                            rotation:originalRotation,
                            scaleX:1, scaleY:1,
                            duration:280,
                            ease:'Back.Out',

                            onComplete: ()=>{
                                this.setDepth(originalDepth);

                                this.resetHover(()=>{
                                    this.hoverEnabled = true;
                                    this.setInputEnabled(true);
                                    onComplete();
                                });
                                
                            }
                        });

                    }
                });
            }
        });
    }

    resetHover(onComplete?: ()=>void ):void{
        this.hovered = false;
        this.scene.tweens.killTweensOf(this);

        this.scene.tweens.add({
            targets: this,
            y: this.baseY,
            scaleX: 1, scaleY: 1,
            duration: 120,
            ease: 'Sine.Out',
            onComplete: ()=> onComplete?.()
        });
    }

    animateHeal(targetX: number, targetY:number, onComplete:()=>void):void{
        this.setInputEnabled(false);
        this.scene.tweens.killTweensOf(this);

        const originalDepth= this.depth;
        this.setDepth(1000);
    
        //la carta se eleva
        this.scene.tweens.add({
            targets:this,
            y: this.y -20,
            scaleX: 1.08, scaleY: 1.08,
            duration: 150,
            ease: 'Sine.Out',

            onComplete: ()=>{
                //se desplaza hacia la vida
                this.scene.tweens.add({
                    targets:this,
                    x: targetX, y: targetY,
                    alpha: 0,
                    scaleX: 0.5, scaleY: 0.5,
                    duration: 350,
                    ease: 'Cubic.In',

                    onComplete: ()=>{
                        this.setDepth(originalDepth);
                        onComplete();
                    }
                });
            }
        });
    }

    animateEquip(targetX:number, targetY:number, onComplete: ()=>void):void{
        const originalDepth = this.depth;

        this.setInputEnabled(false);
        this.scene.tweens.killTweensOf(this);
        this.setDepth(1000);

        this.scene.tweens.add({
            targets:this,
            x:targetX, y:targetY,
            duration: 400,
            ease: 'Cubic.easeInOut',
            onComplete:()=>{
                this.setDepth(originalDepth);
                onComplete();
            }
        })

    }

    animateDefeat( target:{x:number; y:number}|null, onComplete: ()=>void):void{
        this.setInputEnabled(false);
        this.scene.tweens.killTweensOf(this);

        if(target){
            //monstruo derrotado por arma
            this.scene.tweens.add({
                targets:this,
                x:target.x, y:target.y,
                duration: 350,
                ease: 'Cubic.easeInOut',
                onComplete
            });

        }else{
            //monstruo derrotado a puño
            this.scene.tweens.add({
                targets:this,
                alpha:0,
                scaleX: 0.65, scaleY: 0.65,
                duration: 300,
                ease: 'Cubic.easeIn',
                onComplete
            });
        }
    }

}