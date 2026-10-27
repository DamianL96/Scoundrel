import { Card } from "../domain/Card";
import { Suit } from "../domain/enums/Suit";

const SUIT_NAMES: Record<Suit, string> = {
    [Suit.HEART]: 'heart',
    [Suit.DIAMOND]: 'diamond',
    [Suit.CLUBS]: 'clubs',
    [Suit.SPADES]: 'spades',
};

export function cardTextureKey(card: Card): string{
    return `${SUIT_NAMES[card.suit]}_${card.value}`;
}