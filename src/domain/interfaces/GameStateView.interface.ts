import { Card } from "../Card";

export interface GameStateView{
    playerHealth: number;
    maxHealt: number;
    weapon:{
        value: Card;
        historial: Card | null;
    } | null;
    roomCards: Card[];
    deckCount: number;
    canEscape: boolean;
    canReloadRoom: boolean;
    status: 'playing' | 'won' | 'lost';
}