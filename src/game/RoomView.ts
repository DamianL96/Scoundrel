import * as Phaser from 'phaser';
import { Card } from "../domain/Card";
import { CardView } from "./CardView";

export class RoomView{
    
    public static readonly SLOTS = 4;
    private cardViews: CardView[] = [];
    private slots: (Card | null)[] = new Array(RoomView.SLOTS).fill(null);
    private cardClickedCallback: ((card: Card)=>void) | null = null;

    constructor( private scene: Phaser.Scene, private centerY: number){}

    render(cards: Card[], selectedCard: Card | null): void{
        this.clear()
        this.assignSlots(cards);

        const cardWidth = 90;
        const spacing = 20;
        const totalWidth= RoomView.SLOTS * cardWidth + (RoomView.SLOTS - 1) * spacing;
        const startX = (this.scene.scale.width - totalWidth) / 2 + cardWidth / 2; 
        

        this.slots.forEach( (card, slotIndex)=>{
            if(card === null)return;

            const x = startX + slotIndex * (cardWidth + spacing);
            const cardView = new CardView(this.scene, x, this.centerY, card);

            if(selectedCard !== null && card.equals(selectedCard)){
                cardView.setSelected(true);
            }

            cardView.on('card-clicked', (clickedCard: Card)=>{
                this.cardClickedCallback?.(clickedCard);
            });
            this.cardViews.push(cardView);
        });
    }

    private clear(): void{
        this.cardViews.forEach(view => view.destroy());
        this.cardViews = [];
    }

    assignSlots(cards: Card[]):void{
        //libera slots cuya carta no esta en la sala
        this.slots = this.slots.map(slotCard=>
                slotCard !== null && cards.some(c => c.equals(slotCard))? slotCard : null
        );

        //las cartas que no tienen slots, ocupan los libres
        const newCards = cards.filter(
            card => !this.slots.some(
                slotCard => slotCard !== null && slotCard.equals(card)
            )
        );
        newCards.forEach(card =>{
            const freeIndex = this.slots.indexOf(null);
            if(freeIndex !== -1){
                this.slots[freeIndex] = card;
            }
        });
    }

    onCardClicked(callback: (card: Card)=> void):void{
        this.cardClickedCallback = callback;
    }

}