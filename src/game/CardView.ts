import * as Phaser from 'phaser';
import { Card } from "../domain/Card";

export class CardView extends Phaser.GameObjects.Container{

    constructor(scene: Phaser.Scene, x: number, y: number, private card: Card){

        super(scene, x, y);

        const rectangle = scene.add.rectangle(0, 0, 90, 130, 0xffffff).setStrokeStyle(2, 0x000000);
        const text = scene.add.text(0, 0, `${card.suit}\n${card.value}`,{
            fontSize: '18px',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5);

        rectangle.setInteractive({ useHandCursor: true});
        rectangle.on('pointerdown',() => this.emit('card-clicked', this.card)); //emite la carta cuando es clickada

        this.add([rectangle, text]);

        scene.add.existing(this); //para registrar el container en la escena
        /*cuando extendes una clase de game object se tiene que registrar manualmente
        la instancia en la escena a diferencia de this.add.container() que se registra automaticamente en la escena
        sinó el objeto existe en memoria pero no se dibuja en pantalla*/
    }

}