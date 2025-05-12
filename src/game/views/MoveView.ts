import Instance from "../Declare/InstanceDeclare";
import PlaySceneDeclare from "../Declare/PlaySceneDeclare";
// Create Tween for ship move
export default class MoveView{
    private scene: Phaser.Scene;
    private declare: PlaySceneDeclare;
    constructor(scene: Phaser.Scene, declare: PlaySceneDeclare){
        this.scene = scene;
        this.declare = declare;
    }

    public MoveView(duration: number, destinationX: number, destinationY: number, target: string){
        this.scene.tweens.add({
            targets: target === "redShip" ? this.declare.redShip : this.declare.greenShip,
            x: destinationX,
            y: destinationY,
            duration: duration,
            repeat: 0,
            ease: "Linear",
        })
    }
}