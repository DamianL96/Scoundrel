import { beforeEach, describe, expect, it } from "vitest";
import { Deck } from "./Deck";

describe('Deck',()=>{
    let deck:Deck;

    beforeEach(()=>{
        deck = new Deck();
    });

    it('Se crea con 44 cartas',()=>{
        expect(deck.getRemainingCards().length).toBe(44);
    });

    it('No está vacío recien creado',()=>{
        expect(deck.isEmpty()).toBe(false);
    });

    it('drawCard reduce la cantidad de cartas restantes', () => {
        deck.drawCard();
        expect(deck.getRemainingCards().length).toBe(43);
    });

    it('robar hasta vaciar el mazo deja isEmpty en true', () => {
        while (!deck.isEmpty()) {
            deck.drawCard();
        }
        expect(deck.isEmpty()).toBe(true);
    });

    it('robar con el mazo vacío devuelve null', () => {
        while (!deck.isEmpty()) {
            deck.drawCard();
        }
        const card = deck.drawCard();
        expect(card).toBeNull();
    });

    describe('Shuffle',()=>{

        it('el mazo recién creado tiene todas las 44 combinaciones únicas de suit+value', () => {
            const cards = deck.getRemainingCards();
            const claves = cards.map(c => `${c.suit}-${c.value}`);
            const clavesUnicas = new Set(claves);

            expect(cards.length).toBe(44);  
            expect(clavesUnicas.size).toBe(44); // sin duplicados
        });
    });
});