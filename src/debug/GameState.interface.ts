import { Card } from "../domain/Card";

export interface GameState{
    playerHealth: number;
    roomCards: Card[];
    deckCards: Card[];
}