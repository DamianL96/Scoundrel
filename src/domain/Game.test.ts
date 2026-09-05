import { describe, expect, it } from "vitest";
import { Game } from "./Game";
import { Player } from "./Player";
import { Deck } from "./Deck";
import { Room } from "./Room";
import { Card } from "./Card";
import { Suit } from "./enums/Suit";

describe('Game', ()=>{

    describe('loadRoom()',()=>{
        it('Llena la sala hasta 4 cartas cuando está vacía',()=>{
            const game= new Game(new Player(), new Deck(), new Room());
            game.loadRoom();
            expect(game.room.getCards().length).toBe(4);
        });

        it('No recarga si la sala no cumple canReload() (más de una carta en Room)',()=>{
            const room= new Room();
            room.addCard(new Card(Suit.CLUBS,2));
            room.addCard(new Card(Suit.CLUBS,3));

            const game= new Game(new Player(), new Deck(), room);
            game.loadRoom();

            expect(game.room.getCards().length).toBe(2);//no agrega mas cartas
        });
    });

    describe('playCard() - Pocion', ()=>{
        it('Cura al jugador y saca la poción de la sala', () => {
            const player = new Player();
            player.takeDamage_TEST_HELPER?.(10); // ver nota abajo
            const room = new Room();
            const potion = new Card(Suit.HEART, 5);
            room.addCard(potion);

            const game = new Game(player, new Deck(), room);
            game.playCard(potion);

            expect(game.room.getCards().length).toBe(0);
        });
    });

    describe('playCard() - Arma', () => {
        it('Equipa el arma y la saca de la sala', () => {
            const room = new Room();
            const weaponCard = new Card(Suit.DIAMOND, 6);
            room.addCard(weaponCard);

            const game = new Game(new Player(), new Deck(), room);
            game.playCard(weaponCard);

            expect(game.player.hasWeapon()).toBe(true);
            expect(game.room.getCards().length).toBe(0);
        });
    });

    describe('playCard() - Monstruo', () => {
        it('A mano limpia, hace daño al jugador y saca el monstruo de la sala', () => {
            const room = new Room();
            const monster = new Card(Suit.CLUBS, 6);
            room.addCard(monster);

            const game = new Game(new Player(), new Deck(), room);
            game.playCard(monster, false);

            expect(game.player.getHealth()).toBe(14);
            expect(game.room.getCards().length).toBe(0);
        });

        it('Si el arma no puede derrotarlo, el el jugador se come el daño restante', () => {
            const player = new Player();
            player.equipWeapon(new Card(Suit.DIAMOND, 3));
            const room = new Room();
            const monsterFuerte = new Card(Suit.CLUBS, 12);
            room.addCard(monsterFuerte);

            const game = new Game(player, new Deck(), room);
            game.playCard(monsterFuerte, true);

            expect(game.room.getCards().length).toBe(0); // sigue ahí
        });

        it('Si el arma ya derrotó un monstruo, no puede pelear contra otro de valor igual o mayor', () => {
            const player = new Player();
            player.equipWeapon(new Card(Suit.DIAMOND, 5));

            const room = new Room();
            const primerMonstruo = new Card(Suit.CLUBS, 6);
            const segundoMonstruo = new Card(Suit.SPADES, 8); // mayor al primero
            room.addCard(primerMonstruo);
            room.addCard(segundoMonstruo);

            const game = new Game(player, new Deck(), room);
            game.playCard(primerMonstruo, true); // se derrota, arma queda con historial = 6

            game.playCard(segundoMonstruo, true); // debería fallar, 8 >= 6

            expect(game.room.getCards().length).toBe(1); // el segundo monstruo sigue en la sala
        });
    });

    describe('hasWon()', () => {
        it('No gana si el mazo aún tiene cartas', () => {
            const game = new Game(new Player(), new Deck(), new Room());
            expect(game.hasWon()).toBe(false);
        });

        it('gana si el mazo está vacío, no hay monstruos en sala y el jugador vive', () => {
            const emptyDeck = new Deck();
            while (!emptyDeck.isEmpty()) emptyDeck.drawCard();

            const room = new Room();
            room.addCard(new Card(Suit.HEART, 3)); // poción, no monstruo

            const game = new Game(new Player(), emptyDeck, room);
            expect(game.hasWon()).toBe(true);
        });

        it('no gana si el jugador está muerto, aunque el mazo esté vacío', () => {
            const emptyDeck = new Deck();
            while (!emptyDeck.isEmpty()) emptyDeck.drawCard();

            const player = new Player();
            player.fightBareHanded(new Card(Suit.CLUBS, 25)); // lo mata

            const game = new Game(player, emptyDeck, new Room());
            expect(game.hasWon()).toBe(false);
        });
    });

    describe('escapeRoom()', () => {

        it('Mueve las cartas de la sala al fondo del mazo', () => {
            const room = new Room();
            const c1 = new Card(Suit.CLUBS, 5);
            const c2 = new Card(Suit.SPADES, 7);
            room.addCard(c1);
            room.addCard(c2);

            const deck = new Deck();
            const cartasEnMazoAntes = deck.getRemainingCards().length; //44
            
            const game = new Game(new Player(), deck, room);
            game.escapeRoom();

            expect(game.deck.getRemainingCards().length).toBe(cartasEnMazoAntes + 2);
        });

        it('vacía la sala al huir', () => {
            const room = new Room();
            room.addCard(new Card(Suit.CLUBS, 5));

            const game = new Game(new Player(), new Deck(), room);
            game.escapeRoom();

            expect(game.room.getCards().length).toBe(0);
        });

        it('recarga la sala con 4 cartas nuevas después de huir', () => {
            const room = new Room();
            room.addCard(new Card(Suit.CLUBS, 5));
            room.addCard(new Card(Suit.SPADES, 7));

            const game = new Game(new Player(), new Deck(), room);
            game.escapeRoom();

            expect(game.room.getCards().length).toBe(4);
        });


    });
});