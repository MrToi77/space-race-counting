
import PathView from '../views/PathView';
import ButtonStartView from '../views/ButtonStartView';
import ButtonChoiceController from '../controllers/ButtonChoiceController';
import PlaySceneDeclare from '../Declare/PlaySceneDeclare';
import PathController from '../controllers/PathController';
import Instance from '../Declare/InstanceDeclare';
import TextView from '../views/TextView';
export default class PlayScene extends Phaser.Scene {
  private declare: PlaySceneDeclare;
  private buttonController: ButtonChoiceController;
  private currentIndex: number = 0;
  private pathController: PathController;

  constructor() {
    super('PlayScene');
  }

  preload() {
    this.load.image('green_ship', 'assets/product.png');
    this.load.image('red_ship', 'assets/accountant.png');
    this.load.image('background', 'assets/background.svg');
    this.load.image('button_start', 'assets/button_start.png');
    this.load.text('svgData', 'assets/track.svg');
  }

  create() {
    const data = this.cache.text.get('svgData') as string;
    this.add.image(390, 290, 'background').setDepth(2);
    this.declare = new PlaySceneDeclare();
    this.buttonController = new ButtonChoiceController(this, this.declare);
    this.pathController = new PathController(this, this.declare);
    const pathView = new PathView(this, data, this.declare);
    const buttonStartView = new ButtonStartView(this, this.declare);
    const textView = new TextView(this, this.declare);
    this.declare.buttonStartContainer.addListener("pointerdown", () => {
      this.declare.ButtonChoicesContainer.setVisible(true);
      this.declare.buttonStartContainer.setVisible(false);
      this.declare.redShip.startFollow({
        duration: Instance.redShipDuration,
        repeat: 0,
        rotateToPath: true,
        onComplete: () => {
          this.declare.MainMessage.setText(this.declare.MainMessages[1]);
          this.declare.InstructionMessage.setText(this.declare.InstructionMessages[1]);
          this.declare.buttonStartContainer.removeAllListeners();
          this.declare.buttonStartContainer.on("pointerdown", () => {
            this.scene.restart();
          });
          this.declare.ButtonChoicesContainer.setVisible(false);
          this.declare.buttonStartContainer.setVisible(true);
        }
      })
    })
    const start = this.declare.points[0];
    // 3) Tạo red ship theo path chạy liên tục
    this.declare.redShip = this.add.follower(this.declare.path, start.x, start.y , 'red_ship');

    // 4) Tạo green ship (sẽ di chuyển từng bước)
    this.declare.greenShip = this.add.follower(this.declare.path, start.x, start.y, 'green_ship');
  }
}
