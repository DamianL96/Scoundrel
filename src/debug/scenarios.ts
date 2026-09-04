import { Card } from "../domain/Card";
import { Deck } from "../domain/Deck";
import { Suit } from "../domain/enums/Suit";
import { Game } from "../domain/Game";
import { Player } from "../domain/Player";
import { Room } from "../domain/Room";

export function testPlayer(){

    const player= new Player;
    const room= new Room;
    const deck= new Deck;/*
    
    while(!room.isFull()){
        const card= deck.drawCard();
        if(card === null){
            break;
        }
        room.addCard(card);
    }

    //posible funcion para game
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
    
    const habitacion= room.getCards();
    console.log(habitacion);
    deck.addCards(habitacion);
    console.log(deck);

    const cartaNueva= deck.drawCard();
    console.log(cartaNueva);*/
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
    
    //console.log(room.getCards());


    let cartaArma = room.playCard(diamond);
    //let cartaArma4 = room.removeCard(diamond);
    //console.log(cartaArma4);
    if(cartaArma !== null){
        if(cartaArma.isWeapon()){
            player.equipWeapon(cartaArma);
        }
    }
    console.log(player);


    let cartaMonstruo2 = room.playCard(spades);
    if(cartaMonstruo2 !== null){
        let result= player.fightWithWeapon(cartaMonstruo2)
        console.log(result);
    }

    console.log(player);

    let cartaPocion = room.playCard(heart);
    if(cartaPocion !== null){
        player.heal(cartaPocion.value);
    }

    console.log(player);

    
    let cartaMonstruo = room.playCard(clubs);
    if(cartaMonstruo !== null){
        let result= player.fightBareHanded(cartaMonstruo);
        console.log(result);
    }
    console.log(player);

    room.addCard(spades);
    room.addCard(heart);
    room.addCard(diamond2);
    room.addCard(clubs);
    console.log(room);

    let cartaPocion2 = room.playCard(heart);
    if(cartaPocion2 !== null){
        player.heal(cartaPocion2.value);
    }
    console.log(player.getWeapon());
    let cartaArma2 = room.playCard(diamond2);
    if(cartaArma2 !== null){
        if(cartaArma2.isWeapon()){
            player.equipWeapon(cartaArma2);
        }
    }
    console.log(player);

    
    console.log(room);
    console.log(room.hasMonsters());
    
    /*let cartaMonstruo = room.removeCard(new Card(Suit.SPADES,7));
    if(cartaElegida.isMonster()){
        player.takeDamage(cartaElegida.value);
    }
    console.log(player.getHealt());

    console.log(room.getCards());

    
    console.log(player.getHealt());

    console.log(room.getCards());
    

    console.log(room.getCards());
    
    let cartaMonstruo2 = room.removeCard(spades);
    if(cartaMonstruo2 !== null){
        let result= player.fightWithWeapon(cartaMonstruo2);
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
