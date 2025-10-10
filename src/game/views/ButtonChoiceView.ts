export default class ButtonChoiceView {
    private scene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
      this.scene = scene;
    }
  
    createButtonChoiceView(
      positionX: number,
      positionY: number,
      label: string,
      value: number
    ): Phaser.GameObjects.Container {
      // Tạo container
      const container = this.scene.add
        .container(positionX, positionY)
        // Khai báo vùng tương tác 30x30, tâm tại (0,0)
        .setSize(80, 80)
        .setInteractive(
          new Phaser.Geom.Rectangle(-15, -15, 80, 80),
          Phaser.Geom.Rectangle.Contains
        )
        .on('pointerover', () => {
          this.scene.input.setDefaultCursor('pointer');
        })
        .on('pointerout', () => {
          this.scene.input.setDefaultCursor('default');
        });
  
      // Tạo hình khung, đặt depth thấp hơn để text nằm trên
      const frame = this.scene.add
        .image(0, 0, 'button_start')
        .setOrigin(0.5)
        .setScale(0.40)
        .setDepth(0);
  
      // Tạo text, depth cao hơn để hiển thị lên trên khung
      const txt = this.scene.add
        .text(0, 0, label, {
          fontSize: '40px',       // có thể giảm kích cỡ nếu 30px quá lớn với vùng 30x30
          fontStyle: 'bold',
          color: '#000',
          fontFamily: 'Arial',
          align: 'center',
        })
        .setOrigin(0.5)
        .setDepth(1);
  
      // Đưa text và frame vào container
      container.add([frame, txt]);
  
      // Lưu value nếu cần
      container.setData('value', value);
  
      return container;
    }
  }
  