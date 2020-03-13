/**
 * Observer interface with update function
 */

export default interface Observer {
    public registerGame(game Game): void;
    // Send update to game
    public sendUpdate(msg: string): void;
    // Receive update from game
    public receiveUpdate(game: Game, delta: number, msg: string): void;
}
