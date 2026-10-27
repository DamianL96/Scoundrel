import { Card } from "../domain/Card";

export function cardTextureKey(card: Card): string{
    return `card_${card.suit}_${card.value}`;
}