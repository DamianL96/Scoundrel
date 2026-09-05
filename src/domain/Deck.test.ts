import { beforeEach, describe, expect, it } from "vitest";
import { Deck } from "./Deck";

describe('Deck',()=>{
    let deck:Deck;

    beforeEach(()=>{
        deck = new Deck();
    });

    it('Se crea con 44 cartas',()=>{
        expect(deck.getReaminingCards().length).toBe(44);
    });
});