import { Card } from "../domain/Card";
import { Suit } from "../domain/enums/Suit";
import { Player } from "../domain/Player";
import { Room } from "../domain/Room";

export function testPlayer(){
    const player= new Player;
    const room= new Room;

    room.addCard(new Card(Suit.SPADES,7));

    console.log(player.getHealt());
    console.log(room.getCards());
}
