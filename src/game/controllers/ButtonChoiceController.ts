import ButtonChoiceService from "../services/ButtonChoiceService";
import ButtonChoiceView from "../views/ButtonChoiceView";
import PlaySceneDeclare from "../Declare/PlaySceneDeclare";
import Instance from "../Declare/InstanceDeclare";
let checkOutOfRange : boolean = false;
export default class ButtonChoiceController{
    private service: ButtonChoiceService;
    private view: ButtonChoiceView;
    private declare: PlaySceneDeclare;
    private scene: Phaser.Scene;
    constructor(scene: Phaser.Scene, declare: PlaySceneDeclare) {
        this.scene = scene;
        this.declare = declare;
        this.service = new ButtonChoiceService(this.declare);
        this.view = new ButtonChoiceView(this.scene);
        this.setView();
    }

    setView(){
        this.declare.ButtonChoicesContainer = this.scene.add.container(390, 525)
        const ButtonData = this.service.createButtonChoiceData();
        for(let i = 0 ; i < this.declare.ButtonChoiceAmount ; i++){
            const view = this.view.createButtonChoiceView(ButtonData[i]._positionX, ButtonData[i]._positionY, ButtonData[i]._texture, ButtonData[i]._value);
            view.addListener('pointerdown', () => {
                const step = view.getData('value');
            
                  let newIndex = this.declare.currentIndex + step;
                  if(newIndex > 70){
                    newIndex = 70;
                    checkOutOfRange = true;
                  }else{
                    checkOutOfRange = false;
                  }
                  this.animateMove(this.declare.currentIndex, newIndex, () => {
                    if (this.declare.validNodes[newIndex] && !checkOutOfRange) {
                      this.declare.currentIndex = newIndex;
                      if (this.declare.currentIndex === 70) {
                        this.onArrived();     
                      }
                    } else {
                      this.animateMove(newIndex, this.declare.currentIndex, () => {});
                    }
                  });
                });
            this.declare.ButtonChoicesContainer.add([view]);
        }
        this.declare.ButtonChoicesContainer.setVisible(false);
    }

    private animateMove(fromIdx: number, toIdx: number, callback: () => void) {
        const step = toIdx > fromIdx ? 1 : -1;
        let idx = fromIdx + step;
        const timer = this.scene.time.addEvent({
          delay: 77,
          loop: true,
          callback: () => {

            // Tính góc giữa điểm trước (idx - step) và điểm hiện tại (idx)
            const prev = this.declare.points[idx - step];
            const curr = this.declare.points[idx];
            const angle = Phaser.Math.Angle.Between(prev.x, prev.y, curr.x, curr.y);
            // Áp góc cho greenShip
            this.declare.greenShip.setRotation(angle);

            this.moveGreenTo(idx);
            if ((toIdx > fromIdx && idx >= toIdx) || (toIdx < fromIdx && idx <= toIdx)) {
              timer.remove(false);
              callback();
            }
            idx += (toIdx > fromIdx ? 1 : -1);
          }
        });
      }
    
      private moveGreenTo(index: number) {
        const p = this.declare.points[index];
        this.declare.greenShip.setPosition(p.x, p.y);
      }

      private onArrived() {
        this.declare.MainMessage.setText(this.declare.MainMessages[2]);
        this.declare.InstructionMessage.setText(this.declare.InstructionMessages[2]);
      
        // Block mọi nút cũ, show lại start
        this.declare.ButtonChoicesContainer.setVisible(false);
        this.declare.buttonStartContainer.removeAllListeners()
          .setVisible(true)
          .on('pointerdown', () => this.scene.scene.restart());
      
        // Cập nhật level / duration
        Instance.levelIndex += 1;
        Instance.redShipDuration = Math.max(1000, Instance.redShipDuration - 10000);
        this.declare.levelText.setText(`Level ${Instance.levelIndex}`);
      }
      
}