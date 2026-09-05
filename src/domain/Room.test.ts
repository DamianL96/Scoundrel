import { beforeEach, describe, expect, it } from "vitest";
import { Room } from "./Room";
import { Card } from "./Card";
import { Suit } from "./enums/Suit";

describe('Room',()=>{
    let room:Room;

    beforeEach(()=>{
        room= new Room();
    });

    describe('addCard()',()=>{

        it('Agrega una carta cuando hay espacio',()=>{
            room.addCard(new Card(Suit.CLUBS,5));
            expect(room.getCards().length).toBe(1);
        });
        
        it('Agrega hasta 4 cartas', () => {
            for (let i = 2; i <= 5; i++) {
                room.addCard(new Card(Suit.CLUBS, i));
            }
            expect(room.getCards().length).toBe(4);
            expect(room.isFull()).toBe(true);
        });

        it('No agrega una quinta carta si la sala está llena', () => {
            for (let i = 2; i <= 5; i++) {
                room.addCard(new Card(Suit.CLUBS, i));
            }
            room.addCard(new Card(Suit.SPADES, 9)); // debería ser ignorada

            expect(room.getCards().length).toBe(4);
        });
    });

    describe('playCard()',()=>{
        it('Quita y devuelve la carta correcta',()=>{
            const carta= new Card(Suit.CLUBS, 5);
            room.addCard(carta);
            room.addCard(new Card(Suit.SPADES,3));

            const removida= room.playCard(carta);

            expect(removida).not.toBeNull();
            expect(removida?.equals(carta)).toBe(true);
            expect(room.getCards().length).toBe(1);
        });

        it('Devuelve null si la carta no está en la sala', () => {
            room.addCard(new Card(Suit.CLUBS, 5));
            const otraCarta = new Card(Suit.HEART, 9);

            const resultado = room.playCard(otraCarta);

            expect(resultado).toBeNull();
        });

        it('No afecta a las demás cartas al quitar una', () => {
            const c1 = new Card(Suit.CLUBS, 2);
            const c2 = new Card(Suit.SPADES, 3);
            const c3 = new Card(Suit.DIAMOND, 4);
            room.addCard(c1);
            room.addCard(c2);
            room.addCard(c3);

            room.playCard(c2);
            const restantes = room.getCards();

            expect(restantes.length).toBe(2);
            expect(restantes.some(c => c.equals(c1))).toBe(true);
            expect(restantes.some(c => c.equals(c3))).toBe(true);
        });

        it('Funciona con una carta reconstruida (mismo valor, distinta instancia)', () => {
            room.addCard(new Card(Suit.HEART, 7));
            const cartaEquivalente = new Card(Suit.HEART, 7); // otra instancia, mismos datos

            const removida = room.playCard(cartaEquivalente);

            expect(removida).not.toBeNull();
        });
    });

    describe('canReload()',()=>{

        it('No puede recargar con la sala llena',()=>{
            for(let i=2; i<=5; i++){
                room.addCard(new Card(Suit.CLUBS,i));
            }
            expect(room.canReload()).toBe(false);
        });

        it('Puede recargar cuando queda 1 carta', () => {
            const c1 = new Card(Suit.CLUBS, 2);
            room.addCard(c1);
            room.addCard(new Card(Suit.CLUBS, 3));
            room.addCard(new Card(Suit.CLUBS, 4));
            room.addCard(new Card(Suit.CLUBS, 5));

            room.playCard(new Card(Suit.CLUBS, 3));
            room.playCard(new Card(Suit.CLUBS, 4));
            room.playCard(new Card(Suit.CLUBS, 5));

            expect(room.getCards().length).toBe(1);
            expect(room.canReload()).toBe(true);
        });

        it('Puede recargar cuando la sala queda vacía', () => {
            const c1 = new Card(Suit.CLUBS, 2);
            room.addCard(c1);
            room.playCard(c1);

            expect(room.getCards().length).toBe(0);
            expect(room.canReload()).toBe(true);
        });
    });

    describe('getCards()', () => {
        it('Devuelve una copia, no la referencia interna', () => {
            room.addCard(new Card(Suit.CLUBS, 5));
            const copia = room.getCards();
            copia.push(new Card(Suit.SPADES, 9)); // mutar la copia

            expect(room.getCards().length).toBe(1); // el estado interno no cambió
        });
    });

});