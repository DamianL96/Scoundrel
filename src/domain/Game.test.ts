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
            player.takeDamage_TEST_HELPER?.(10);

            const room = new Room();
            const potion = new Card(Suit.HEART, 5);
            room.addCard(potion);
            room.addCard(new Card(Suit.CLUBS,3));

            const game = new Game(player, new Deck(), room);
            game.playCard(potion);

            expect(game.room.getCards().length).toBe(1);
        });
        it('Cura al jugador si es la ultima carta, recarga la sala', () => {
            const player = new Player();
            player.takeDamage_TEST_HELPER?.(10);

            const room = new Room();
            const potion = new Card(Suit.HEART, 5);
            room.addCard(potion);

            const game = new Game(player, new Deck(), room);
            game.playCard(potion);

            expect(game.room.getCards().length).toBe(4);//recarga automaticamente
        });
    });

    describe('playCard() - Arma', () => {
        it('Equipa el arma y la saca de la sala', () => {
            const room = new Room();
            const weaponCard = new Card(Suit.DIAMOND, 6);
            room.addCard(weaponCard);
            room.addCard(new Card(Suit.CLUBS,3));

            const game = new Game(new Player(), new Deck(), room);
            game.playCard(weaponCard);

            expect(game.player.hasWeapon()).toBe(true);
            expect(game.room.getCards().length).toBe(1);
        });
        it('Equipa el arma, si es la ultima carta, recarga la sala', () => {
            const room = new Room();
            const weaponCard = new Card(Suit.DIAMOND, 6);
            room.addCard(weaponCard);

            const game = new Game(new Player(), new Deck(), room);
            game.playCard(weaponCard);

            expect(game.player.hasWeapon()).toBe(true);
            expect(game.room.getCards().length).toBe(4);
        });
    });

    describe('playCard() - Monstruo', () => {
        it('A mano limpia, hace daño al jugador y saca el monstruo de la sala', () => {
            const room = new Room();
            const monster = new Card(Suit.CLUBS, 6);
            room.addCard(monster);
            room.addCard(new Card(Suit.CLUBS,3));

            const game = new Game(new Player(), new Deck(), room);
            game.playCard(monster, false);

            expect(game.player.getHealth()).toBe(14);
            expect(game.room.getCards().length).toBe(1);
        });
        it('A mano limpia, hace daño al jugador y saca el monstruo de la sala, si es la ultima carta, recarga la sala', () => {
            const room = new Room();
            const monster = new Card(Suit.CLUBS, 6);
            room.addCard(monster);

            const game = new Game(new Player(), new Deck(), room);
            game.playCard(monster, false);

            expect(game.player.getHealth()).toBe(14);
            expect(game.room.getCards().length).toBe(4);
        });

        it('Si el arma no puede derrotarlo, el jugador se come el daño restante', () => {
            const player = new Player();
            player.equipWeapon(new Card(Suit.DIAMOND, 3));
            const room = new Room();
            const monsterFuerte = new Card(Suit.CLUBS, 12);
            room.addCard(monsterFuerte);
            room.addCard(new Card(Suit.CLUBS,3));

            const game = new Game(player, new Deck(), room);
            game.playCard(monsterFuerte, true);

            expect(game.room.getCards().length).toBe(1); // sigue ahí
        });
        it('Si el arma no puede derrotarlo, el jugador se come el daño restante, si es la ultima carta, recarga la sala', () => {
            const player = new Player();
            player.equipWeapon(new Card(Suit.DIAMOND, 3));
            const room = new Room();
            const monsterFuerte = new Card(Suit.CLUBS, 12);
            room.addCard(monsterFuerte);

            const game = new Game(player, new Deck(), room);
            game.playCard(monsterFuerte, true);

            expect(game.room.getCards().length).toBe(4); // sigue ahí
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

        it('Vacía la sala al huir', () => {
            const room = new Room();
            room.addCard(new Card(Suit.CLUBS, 5));
            room.addCard(new Card(Suit.SPADES, 7));

            const game = new Game(new Player(), new Deck(), room);
            game.escapeRoom();

            expect(game.room.getCards().length).toBe(0);
        });

        it('Llamar loadRoom() después de escapar recarga la sala', () => {
            const room = new Room();
            room.addCard(new Card(Suit.CLUBS, 5));
            room.addCard(new Card(Suit.SPADES, 7));

            const game = new Game(new Player(), new Deck(), room);
            game.escapeRoom();
            game.loadRoom();

            expect(game.room.getCards().length).toBe(4);
        });
    });

    describe('points()',()=>{
        it('No muta el mazo real: llamarlo dos veces da el mismo resultado',()=>{
            const game= new Game(new Player(), new Deck(), new Room());

            const primeraLlamada= game.points();
            const segundaLlamada= game.points();

            expect(segundaLlamada).toBe(primeraLlamada);
        });

        it('No reduce la cantidad de cartas restantes del mazo', () => {
        const deck = new Deck();
        const cantidadAntes = deck.getRemainingCards().length;

        const game = new Game(new Player(), deck, new Room());
        game.points();

        expect(game.deck.getRemainingCards().length).toBe(cantidadAntes);
        });

        describe('Jugador vivo', () => {
            it('Devuelve la vida actual si no hay pociones en el mazo restante', () => {
                const player = new Player();
                player.fightBareHanded(new Card(Suit.CLUBS, 5)); // 15 HP

                const deck = new Deck();
                while (!deck.isEmpty()) deck.drawCard(); // mazo vacío, sin pociones que sumar

                const game = new Game(player, deck, new Room());

                expect(game.points()).toBe(15);
            });

            it('Suma el valor de las pociones restantes en el mazo a la vida actual', () => {
                const player = new Player();
                player.fightBareHanded(new Card(Suit.CLUBS, 5)); // 15 HP

                const deck = new Deck();
                while (!deck.isEmpty()) deck.drawCard(); // vaciamos
                deck.addCards([new Card(Suit.HEART, 4), new Card(Suit.HEART, 6)]); // agregamos 2 pociones conocidas

                const game = new Game(player, deck, new Room());

                expect(game.points()).toBe(15 + 4 + 6); // 25
            });

            it('Ignora cartas que no son pociones al sumar', () => {
                const player = new Player();
                const deck = new Deck();
                while (!deck.isEmpty()) deck.drawCard();
                deck.addCards([
                    new Card(Suit.HEART, 5),   // poción, cuenta
                    new Card(Suit.CLUBS, 9),   // monstruo, no cuenta
                    new Card(Suit.DIAMOND, 3), // arma, no cuenta
                ]);

                const game = new Game(player, deck, new Room());

                expect(game.points()).toBe(20 + 5); // solo la poción suma
            });
        });

        describe('Jugador muerto', () => {
            
        it('Devuelve un valor negativo restando el valor de los monstruos restantes', () => {
            const player = new Player();
            player.fightBareHanded(new Card(Suit.CLUBS, 25)); // lo mata

            const deck = new Deck();
            while (!deck.isEmpty()) deck.drawCard();
            deck.addCards([new Card(Suit.CLUBS, 6), new Card(Suit.SPADES, 4)]);

            const game = new Game(player, deck, new Room());

            expect(game.points()).toBe(-10); // -(6 + 4)
        });

        it('Ignora cartas que no son monstruos al restar', () => {
            const player = new Player();
            player.fightBareHanded(new Card(Suit.CLUBS, 25));

            const deck = new Deck();
            while (!deck.isEmpty()) deck.drawCard();
            deck.addCards([
                new Card(Suit.CLUBS, 6),   // monstruo, cuenta
                new Card(Suit.HEART, 9),   // poción, no cuenta
                new Card(Suit.DIAMOND, 3), // arma, no cuenta
            ]);

            const game = new Game(player, deck, new Room());

            expect(game.points()).toBe(-6);
        });
    });

    });
});