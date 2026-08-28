import { Card } from "../domain/Card";
import { Suit } from "../domain/enums/Suit";
import { Player } from "../domain/Player";
import { Room } from "../domain/Room";

export function testPlayer(){

    const player= new Player;
    const room= new Room;


    let spades= new Card(Suit.SPADES,7);
    let diamond= new Card(Suit.DIAMOND,4);
    let heart= new Card(Suit.HEART,3);
    let clubs= new Card(Suit.CLUBS,5);



    

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
    
    player.takeDamageWithWeapon(cartaMonstruo.value);
    player.takeDamage(cartaMonstruo.value);
    console.log(player.getHealt());

    //console.log(room.getCards());
    //el jugador ataca al monstruo con el arma equipada




}
