import { describe, it, expect, beforeEach } from 'vitest';
import { Player } from './Player';
import { Card } from './Card';
import { Suit } from './enums/Suit';

describe('Player', ()=>{

    let player: Player;

    beforeEach(()=>{
        player = new Player();
    })

    it('Comienza con 20 HP',()=>{
        expect(player.getHealth()).toBe(20);
    });

    it('Recibe daño y reduce vida',()=>{
        const monster= new Card(Suit.CLUBS,5);
        player.fightBareHanded(monster);
        expect(player.getHealth()).toBe(15);
    });

    it('Acumula daño de varios golpes',()=>{
        const monster= new Card(Suit.CLUBS,5);
        player.fightBareHanded(monster);
        player.fightBareHanded(monster);
        expect(player.getHealth()).toBe(10);
    });

    it('Se cura y aumenta vida', ()=>{
        const monster= new Card(Suit.CLUBS,10);
        player.fightBareHanded(monster);
        player.heal(5);
        expect(player.getHealth()).toBe(15);
    });

    it('La curacion no supera el maximo de 20 con una curacion', ()=>{
        const monster= new Card(Suit.CLUBS,10);
        player.fightBareHanded(monster);
        player.heal(100);
        expect(player.getHealth()).toBe(20);
    });

    it('La curacion no supera el maximo de 20 con varias curaciones', ()=>{
        const monster= new Card(Suit.CLUBS,10);
        player.fightBareHanded(monster);
        player.heal(9);
        player.heal(9);
        player.heal(9);
        expect(player.getHealth()).toBe(20);
    });

    it('Llega a 0 HP y se considera muerto', ()=>{
        const monster= new Card(Suit.CLUBS,20);
        player.fightBareHanded(monster);

        expect(player.getHealth()).toBe(0);
        expect(player.isDead()).toBe(true);
    });

    it('El daño no baja de 0 HP', ()=>{
        const monster= new Card(Suit.CLUBS,999);
        player.fightBareHanded(monster);
        expect(player.getHealth()).toBe(0);
    });

    
});