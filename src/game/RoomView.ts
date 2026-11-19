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
      
        this.assignSlots(cards);

        //elimina cartas que no estan en la habitacion
        this.cardViews = this.cardViews.filter( view =>{
            const stillExists = cards.some( card =>
                card.equals(view.getCard())
            );

            if(!stillExists){
                view.destroy();
            }

            return stillExists;
        });


        const cardWidth = 90;
        const spacing = 20;

        const totalWidth= 
            RoomView.SLOTS * cardWidth + 
            (RoomView.SLOTS - 1) * spacing;

        const startX= 
            (this.scene.scale.width - totalWidth) / 2 +
            cardWidth / 2; 
        
        let animationIndex = 0;

        this.slots.forEach( (card, slotIndex)=>{
            if(card === null)return;

            const x = startX + slotIndex * (cardWidth + spacing);
            const y = this.centerY;

            //ya existe la carta?
            let cardView = this.cardViews.find( view=> view.getCard().equals(card));

            if(cardView){
                cardView.setSelected(
                    selectedCard !== null &&
                    card.equals(selectedCard)
                );
                return;
            }

            //crea la carta nueva en la posicion del mazo
            cardView = new CardView(this.scene, 80, 150, card);

            cardView.setSelected(selectedCard !== null && card.equals(selectedCard));

            const initialRotation = animationIndex % 2 === 0 ? 0.12 : -0.12;
            cardView.setAlpha(0);
            cardView.setScale(0.85);
            cardView.setRotation(initialRotation);
            cardView.setInputEnabled(false);
            cardView.on('card-clicked', (clickedCard: Card)=>{
                this.cardClickedCallback?.(clickedCard);
            });
            this.cardViews.push(cardView);


            this.scene.tweens.add({ 
                targets:cardView, 
                x:x, y:y, 
                alpha:1, scaleX:1, scaleY:1,
                rotation:0, duration:420, 
                delay:animationIndex*320, 
                ease:'Cubic.easeOut', 
                onComplete:()=>{
                    cardView?.setBasePosition(x,y);
                    cardView?.setInputEnabled(true);
                }
            });
            animationIndex++;
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

    //obtiene la posicion del monstruo/carta
    getCardPosition(card: Card): Phaser.Math.Vector2 | null{
        const view = this.getCardView(card);

        if(!view) return null;

        return new Phaser.Math.Vector2(view.x, view.y);
    }

    getCardView(card:Card): CardView | null{
        return this.cardViews.find(  view => view.getCard().equals(card)  ) ?? null;
    }

    //hace retroceder al monstruo cuando es golpeado
    playHittEffect(card: Card):void{

        const view= this.cardViews.find(v=>v.getCard().equals(card));

        if(!view) return;

        this.scene.tweens.add({
            targets:view, x:view.x + 7,
            duration:35, yoyo:true, repeat:2,
            ease:'Sine.InOut'
        });
    }
}