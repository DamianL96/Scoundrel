import { beforeEach, describe, expect, it } from "vitest";
import { Weapon } from "./Weapon";
import { Card } from "./Card";
import { Suit } from "./enums/Suit";

describe('',()=>{
    let weapon: Weapon;

    beforeEach(()=>{
        weapon = new Weapon(new Card(Suit.DIAMOND,5));
    });

    it('Expone el valor de la carta con la que fue creada',()=>{
        expect(weapon.getValue()).toBe(5);
    });

    it('Recien equipada no tiene historial de monstruos derrotados',()=>{
        expect(weapon.getLastMonsterDefeated()).toBeNull();
    });

    describe('canDefeat',()=>{
        it('Recien equipada puede derrotar a cualquier monstruo',()=>{
            const monsterWeak= new Card(Suit.CLUBS,2);
            const monsterStrong= new Card(Suit.SPADES,14);

            expect(weapon.canDefeat(monsterWeak)).toBe(true);
            expect(weapon.canDefeat(monsterStrong)).toBe(true);
        });

        it('No puede derrotar un monstruo de valor igual al último derrotado', () => {
            const primerMonstruo = new Card(Suit.CLUBS, 8);
            weapon.updateLastMonster(primerMonstruo);

            const monstruoIgual = new Card(Suit.SPADES, 8);
            expect(weapon.canDefeat(monstruoIgual)).toBe(false);
        });

         it('no puede derrotar un monstruo de valor mayor al último derrotado', () => {
            weapon.updateLastMonster(new Card(Suit.CLUBS, 8));

            const monstruoMayor = new Card(Suit.SPADES, 10);
            expect(weapon.canDefeat(monstruoMayor)).toBe(false);
        });
        
        it('puede derrotar un monstruo de valor menor al último derrotado', () => {
            weapon.updateLastMonster(new Card(Suit.CLUBS, 8));

            const monstruoMenor = new Card(Suit.SPADES, 4);
            expect(weapon.canDefeat(monstruoMenor)).toBe(true);
        });
    });

    describe('updateLastMonster()',()=>{
        it('Actualiza el registro del último monstruo derrotado',()=>{
            const monster = new Card(Suit.CLUBS, 6);
            weapon.updateLastMonster(monster);

            expect(weapon.getLastMonsterDefeated()).toBe(monster);
        });
    });
});