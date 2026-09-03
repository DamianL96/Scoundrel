import { Card } from "../domain/Card";
import { Deck } from "../domain/Deck";
import { Suit } from "../domain/enums/Suit";
import { Player } from "../domain/Player";
import { Room } from "../domain/Room";

export function testPlayer(){

    const player= new Player;
    const room= new Room;
    const deck= new Deck;
    
    while(!room.isFull()){
        const card= deck.drawCard();
        if(card === null){
            break;
        }
        room.addCard(card);
    }

    let cards: Card[]= room.getCards();
    let cartaJugada= room.playCard(cards[1]);
    console.log(cartaJugada);
    console.log(room.getCards());
    if(room.canReload()){
        while(!room.isFull()){
            const card= deck.drawCard();
            if(card === null){
                break;
            }
            room.addCard(card);
        }   
    }

    let cartaJugada2= room.playCard(cards[0]);
    console.log(cartaJugada2);
    console.log(room.getCards());
    if(room.canReload()){
        while(!room.isFull()){
            const card= deck.drawCard();
            if(card === null){
                break;
            }
            room.addCard(card);
        }   
    }
    let cartaJugada3= room.playCard(cards[1]);
    console.log(cartaJugada3);
    console.log(room.getCards());

    let cartaJugada4= room.playCard(cards[0]);
    console.log(cartaJugada4);
    console.log(room.getCards());
    if(room.canReload()){
        while(!room.isFull()){
            const card= deck.drawCard();
            if(card === null){
                break;
            }
            room.addCard(card);
        }   
    }
    
    /*console.log("Mazo original", deck);

    let cartaNueva: Card;
    
    while(!deck.isEmpty()){
        cartaNueva= deck.getCard();
        console.log(cartaNueva);
    }
    
    console.log("Mazo actualizado",deck);
    */
    
    
/*




    let spades= new Card(Suit.SPADES,5);
    let diamond= new Card(Suit.DIAMOND,4);
    let heart= new Card(Suit.HEART,8);
    let clubs= new Card(Suit.CLUBS,14);


    let diamond2= new Card(Suit.DIAMOND,6);

    

    room.addCard(spades);
    room.addCard(heart);
    room.addCard(diamond);
    room.addCard(clubs);
    room.addCard(clubs);
    console.log(room.getCards());

    /*let cartaMonstruo = room.removeCard(new Card(Suit.SPADES,7));
    if(cartaElegida.isMonster()){
        player.takeDamage(cartaElegida.value);
    }
    console.log(player.getHealt());

    console.log(room.getCards());

    let cartaElegida2 = room.removeCard(new Card(Suit.HEART,3));
    if(cartaElegida2.isPotion()){
        player.heal(cartaElegida2.value);
    }
    console.log(player.getHealt());

    console.log(room.getCards());
    
    let cartaArma = room.removeCard(diamond);
    let cartaArma4 = room.removeCard(diamond);
    console.log(room.getCards());
    console.log(cartaArma4);
    if(cartaArma !== null){
        if(cartaArma.isWeapon()){
            player.equipWeapon(cartaArma);
        }
    }
    console.log(player);
    

    let cartaMonstruo = room.removeCard(clubs);
    if(cartaMonstruo !== null){
        let result= player.fightBareHanded(cartaMonstruo);
        console.log(result);
        result= player.fightBareHanded(cartaMonstruo);
        console.log(result);
    }

    console.log(room.getCards());
    
    let cartaMonstruo2 = room.removeCard(spades);
    if(cartaMonstruo2 !== null){
        let result= player.fightWithWeapon(cartaMonstruo2);
        console.log(player);
        console.log(result);
        result= player.fightWithWeapon(cartaMonstruo2);
        console.log(player);
        console.log(result);
    }
    console.log(room.getCards());
    console.log(player);
    
    

    let potion= room.removeCard(heart);
    console.log(room);

    let potion2= room.removeCard(heart);
    console.log(room);
    /*player.fightWithWeapon(cartaMonstruo);
    player.fightWithWeapon(cartaMonstruo);
    //player.takeDamage(cartaMonstruo.value);
    console.log(player.getHealt());

    console.log(room.getCards());
    //el jugador ataca al monstruo con el arma equipada
    /*let cartaCura = room.removeCard(heart);
    if(cartaCura.isPotion()){
        player.heal(cartaCura.value);
    }
    console.log(room.getCards());
    console.log(player);/*
    
    if(room.canReload()){
        room.addCard(heart);
        room.addCard(diamond2);
        room.addCard(spades);
    }
    console.log(room.getCards());
    
    player.equipWeapon(diamond2);
    console.log(player);*/

}
