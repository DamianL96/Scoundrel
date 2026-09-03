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
        return this.suit === Suit.DIAMOND;
    }

    equals(other: Card):boolean{
        return this.suit === other.suit && this.value === other.value;
    }

}