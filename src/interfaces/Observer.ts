/**
 * Observer interface with update function
 */
import Game from "../classes/Game";

export default interface Observer {
    registerGame(game: Game): void;
    // Send update to game
    sendUpdate(msg: string): void;
    // Receive update from game
    receiveUpdate(game: Game, delta: number, msg: string, param: any): void;
}
