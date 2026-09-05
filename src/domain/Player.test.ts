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

describe('Player - Combate', ()=>{
    let player: Player;

    beforeEach(()=>{
        player= new Player();
    });

    describe('fightBareHanded()', ()=>{
        it('Recibe daño igual al valor del mosntruo',()=>{
            const monster = new Card(Suit.CLUBS, 6);
            const result = player.fightBareHanded(monster);

            expect(result.success).toBe(true);
            expect(result.damageReceived).toBe(6);
            expect(player.getHealth()).toBe(14);
        });

        it('Indica plarerIsDead si el golpe lo mata', ()=>{
            const monster = new Card(Suit.CLUBS, 25);
            const result = player.fightBareHanded(monster);

            expect(result.playerDead).toBe(true);
            expect(player.isDead()).toBe(true);
        });
    });

    describe('fightWithWeapon()', ()=>{
        it('Falla si no hay arma equipada',()=>{
            const monster = new Card(Suit.CLUBS, 5);
            const result = player.fightWithWeapon(monster);

            expect(result.success).toBe(false);
            expect(result.damageReceived).toBe(0);
            expect(player.getHealth()).toBe(20);
        });

        it('Falla si el arma no puede derrotar al mostruo(Ya derrotó a uno menor)', ()=>{
            player.equipWeapon(new Card(Suit.DIAMOND, 5));
            player.fightWithWeapon(new Card(Suit.CLUBS, 3));
            const result= player.fightWithWeapon(new Card(Suit.CLUBS, 8));

            expect(result.success).toBe(false);
        });

        it('Falla si el arma no puede derrotar al mostruo(Ya derrotó a de igual daño)', ()=>{
            player.equipWeapon(new Card(Suit.DIAMOND, 5));
            player.fightWithWeapon(new Card(Suit.CLUBS, 3));
            const result= player.fightWithWeapon(new Card(Suit.CLUBS, 3));

            expect(result.success).toBe(false);
        });

        it('Reduce el daño recibido según el valor del arma',()=>{
            player.equipWeapon(new Card(Suit.DIAMOND, 5));
            const result= player.fightWithWeapon(new Card(Suit.CLUBS, 8));

            expect(result.success).toBe(true);
            expect(result.damageReceived).toBe(3);
            expect(player.getHealth()).toBe(17);
        });

        it('El daño no baja de 0 si el arma es mas fuerte que el mosntruo', ()=>{
            player.equipWeapon(new Card(Suit.DIAMOND, 5));
            const result= player.fightWithWeapon(new Card(Suit.CLUBS, 4));

            expect(result.success).toBe(true);
            expect(result.damageReceived).toBe(0);
            expect(player.getHealth()).toBe(20);
        });

        it('El daño no baja de 0 si el arma es igual de fuerte que el mosntruo', ()=>{
            player.equipWeapon(new Card(Suit.DIAMOND, 5));
            const result= player.fightWithWeapon(new Card(Suit.CLUBS, 5));

            expect(result.success).toBe(true);
            expect(result.damageReceived).toBe(0);
            expect(player.getHealth()).toBe(20);
        });

        it('El arma se rompe (no puede derrotar) pero el jugador no recibió daño en el intento fallido', ()=>{
            player.equipWeapon(new Card(Suit.DIAMOND, 5));
            player.fightWithWeapon(new Card(Suit.CLUBS, 3));
            const antesDeSegundoIntento = player.getHealth();

            player.fightWithWeapon(new Card(Suit.CLUBS, 8)); //el arma no lo mata

            expect(player.getHealth()).toBe(antesDeSegundoIntento);
        });
    })
});