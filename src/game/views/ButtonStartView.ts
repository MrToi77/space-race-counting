import PlaySceneDeclare from "../Declare/PlaySceneDeclare";
import Instance from "../Declare/InstanceDeclare";
export default class ButtonStartView{
    private scene: Phaser.Scene;
    private declare: PlaySceneDeclare
    constructor(scene: Phaser.Scene, declare: PlaySceneDeclare){
        this.scene = scene;
        this.declare = declare;
        this.createButtonStart();
    }
    
    private createButtonStart(){
        this.declare.buttonStartContainer = this.scene.add.container(390, 600).setSize(130, 130).setInteractive(
            new Phaser.Geom.Rectangle(0, 0, 100, 100),
            Phaser.Geom.Rectangle.Contains
          ).on('pointerover', () => {
            this.scene.input.setDefaultCursor('pointer');
          })
          .on('pointerout', () => {
            this.scene.input.setDefaultCursor('default');
          });

        const frame = this.scene.add.image(0,0,'button_start').setOrigin(0.5, 0.5).setScale(0.7);
        const startText = this.scene.add.text(0, -15, "Start", {
            fontSize: "35px",
            fontFamily: "Arial",
            color: "#000000",
            fontStyle: "bold"
        }).setOrigin(0.5, 0.5);
        
        this.declare.levelText = this.scene.add.text(0, 20, `Level ${Instance.levelIndex}`, {
            fontSize: "25px",
            fontFamily: "Arial",
            color: "#000000",
        }).setOrigin(0.5, 0.5);

        this.declare.buttonStartContainer.add([frame, startText, this.declare.levelText]);
    }
    
}