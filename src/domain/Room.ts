import { Card } from "./Card";

export class Room{
    private cards: Card[] = [];

    addCard(card: Card): void{
        this.cards.push(card);
    }

    removeCard(card: Card): void{
        //remover carta
    }

    getCards(): Card[]{
        return[...this.cards];
    }
}