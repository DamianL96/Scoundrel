import { Suit } from "./enums/Suit";

export class Card{

    constructor(
        readonly suit: Suit,
        readonly value: number
    ){}

    isMonster(): boolean{
        return this.suit === Suit.CLUBS ||
                this.suit === Suit.SPADES;
    }

    isPotion(): boolean{
        return this.suit === Suit.HEART;
    }

    isWeapon(): boolean{
        console.log(this.suit === Suit.DIAMOND);
        return this.suit === Suit.DIAMOND;
    }

}