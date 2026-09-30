import * as Phaser from 'phaser';
import { Card } from "../domain/Card";
import { CardView } from "./CardView";

export class RoomView{
    private cardViews: CardView[] = [];

    constructor( private scene: Phaser.Scene, private centerY: number){}

    render(cards: Card[]): void{
        //this.clear()

        const cardWidth = 90;
        const spacing = 20;
        const totalWidth= cards.length + cardWidth + (cards.length - 1) * spacing;
        const startX = (this.scene.scale.width - totalWidth) / 2 + cardWidth / 2; //que hace esto?
        

        cards.forEach( (card, index)=>{
            const x = startX + index * (cardWidth + spacing);
            const cardView = new CardView(this.scene, x, this.centerY, card);

            cardView.on('card-clicked', (clickedCard: Card)=>{
                this.scene.events.emit('card-clicked', clickedCard);
            });
            this.cardViews.push(cardView);
        });
    }

    private clear(): void{
        this.cardViews.forEach(view => view.destroy());
        this.cardViews = [];
    }
}