import { Card } from "../domain/Card";
import { Deck } from "../domain/Deck";
import { Suit } from "../domain/enums/Suit";
import { Player } from "../domain/Player";
import { Room } from "../domain/Room";

export function testPlayer(){

    const player= new Player;
    const room= new Room;
    const deck= new Deck;
    
    /*console.log("Mazo original", deck);

    let cartaNueva: Card;
    
    while(!deck.isEmpty()){
        cartaNueva= deck.getCard();
        console.log(cartaNueva);
    }
    
    console.log("Mazo actualizado",deck);
    */
    
    





    let spades= new Card(Suit.SPADES,5);
    let diamond= new Card(Suit.DIAMOND,4);
    let heart= new Card(Suit.HEART,8);
    let clubs= new Card(Suit.CLUBS,14);


    let diamond2= new Card(Suit.DIAMOND,6);

    

    room.addCard(spades);
    room.addCard(heart);
    room.addCard(diamond);
    room.addCard(clubs);

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

    console.log(room.getCards());*/
    
    let cartaArma = room.removeCard(diamond);
    
    
    if(cartaArma.isWeapon()){
        player.equipWeapon(cartaArma);
    }
    console.log(player);

    let cartaMonstruo = room.removeCard(clubs);
    let cartaMonstruo2 = room.removeCard(spades);

    //player.fight(cartaMonstruo.value);
    //player.fight(cartaMonstruo2.value);

    console.log(player);
    //player.fight(cartaMonstruo2.value);
    console.log(player);
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
