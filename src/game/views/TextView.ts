import PlaySceneDeclare from "../Declare/PlaySceneDeclare";
export default class TextView{
    private declare: PlaySceneDeclare;
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, declare: PlaySceneDeclare){
        this.scene = scene;
        this.declare = declare;
        this.createText();
    }

    private createText(){
        this.declare.MessagesContainer = this.scene.add.container(390, 40);
        this.declare.MainMessage = this.scene.add.text(0, 0, `${this.declare.MainMessages[0]}`, {
            fontFamily: "Arial",
            fontSize: "45px",
            fontStyle: "bold",
            color: "#000"
        }).setOrigin(0.5, 0.5);
        this.declare.InstructionMessage = this.scene.add.text(0, 25, `${this.declare.InstructionMessages[0]}`, {
            fontFamily: "Arial",
            fontSize: "15px",
            color: "#000"
        }).setOrigin(0.5, 0.5);
        
        this.declare.MessagesContainer.add([this.declare.MainMessage, this.declare.InstructionMessage]);
    }
}