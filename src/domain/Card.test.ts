import { describe, expect, it } from "vitest";
import { Card } from "./Card";
import { Suit } from "./enums/Suit";

describe('Card', ()=>{
    describe('isMonster()',()=>{
        
        it('identifica CLUBS como monstruo', ()=>{
            const card= new Card(Suit.CLUBS, 5);
            expect(card.isMonster()).toBe(true);
        });

        it('identifica SPADES como monstruo', ()=>{
            const card= new Card(Suit.SPADES, 5);
            expect(card.isMonster()).toBe(true);
        });

        it('No identifica HEART como monstruo', ()=>{
            const card= new Card(Suit.HEART, 5);
            expect(card.isMonster()).toBe(false);
        });

        it('No identifica DIAMONDS como monstruo', ()=>{
            const card= new Card(Suit.DIAMOND, 5);
            expect(card.isMonster()).toBe(false);
        });
    });

    describe('isPotion',()=>{

        it('Identifica HEART como poción', ()=>{
            const card= new Card(Suit.HEART,5);
            expect(card.isPotion()).toBe(true);
        });
        
        it('No identifica DIAMOND como poción', ()=>{
            const card= new Card(Suit.DIAMOND,5);
            expect(card.isPotion()).toBe(false);
        });
        it('No identifica CLUBS como poción', ()=>{
            const card= new Card(Suit.CLUBS,5);
            expect(card.isPotion()).toBe(false);
        });
        it('No identifica SPADES como poción', ()=>{
            const card= new Card(Suit.SPADES,5);
            expect(card.isPotion()).toBe(false);
        });

    });

    describe('isWeapon()', ()=>{
        it('Identifica DIAMOND como arma', ()=>{
            const card= new Card(Suit.DIAMOND,5);
            expect(card.isWeapon()).toBe(true);
        });
        it('No identifica HEART como arma', ()=>{
            const card= new Card(Suit.HEART,5);
            expect(card.isWeapon()).toBe(false);
        });
        it('No identifica CLUBS como arma', ()=>{
            const card= new Card(Suit.CLUBS,5);
            expect(card.isWeapon()).toBe(false);
        });
        it('No identifica SPADES como arma', ()=>{
            const card= new Card(Suit.SPADES,5);
            expect(card.isWeapon()).toBe(false);
        });
    });

    describe('equals()',()=>{
        it('Dos cartas con mismo suit y value son iguales', ()=>{
            const a = new Card(Suit.HEART,7);
            const b = new Card(Suit.HEART,7);
            expect(a.equals(b)).toBe(true);
        });
        it('Cartas con distinto value no son iguales', ()=>{
            const a = new Card(Suit.HEART,7);
            const b = new Card(Suit.HEART,8);
            expect(a.equals(b)).toBe(false);
        });
        it('Cartas con distinto suit no son iguales', ()=>{
            const a = new Card(Suit.HEART,7);
            const b = new Card(Suit.DIAMOND,7);
            expect(a.equals(b)).toBe(false);
        });
    });

});