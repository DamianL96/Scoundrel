import * as Phaser from 'phaser';
import { Card } from "../domain/Card";
import { CardButton } from './CardButton';

export class CardView extends CardButton{

    //private rectangle: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, x: number, y: number, private card: Card){

        super(scene, x, y, `${card.suit}\n${card.value}`);

        
        this.on('clicked',() => this.emit('card-clicked', this.card)); //emite la carta cuando es clickada

        //this.add([this.rectangle, text]);

        //scene.add.existing(this); //para registrar el container en la escena
        /*cuando extendes una clase de game object se tiene que registrar manualmente
        la instancia en la escena a diferencia de this.add.container() que se registra automaticamente en la escena
        sinó el objeto existe en memoria pero no se dibuja en pantalla*/
    }
}