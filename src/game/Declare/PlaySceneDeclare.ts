export default class PlaySceneDeclare{
    public ButtonChoicesContainer: Phaser.GameObjects.Container;
    public ButtonChoiceAmount: number = 10;
    public currentIndex = 0;
    public validNodes: boolean[] = [];
    public points: Phaser.Math.Vector2[] = [];
    public greenShip!: Phaser.GameObjects.PathFollower ;
    public redShip!: Phaser.GameObjects.PathFollower ;
    public amountOfNode: number = 71;
    public path!: Phaser.Curves.Path;
    public buttonStartContainer: Phaser.GameObjects.Container;
    public levelText: Phaser.GameObjects.Text;
    public MessagesContainer: Phaser.GameObjects.Container;
    public MainMessage: Phaser.GameObjects.Text;
    public InstructionMessage: Phaser.GameObjects.Text;
    public MainMessages: string[] = ['Chiến thắng cuộc đua.','Thuyền Đỏ Thắng.','Bạn thắng rồi!'];
    public InstructionMessages: string[] = ['Di chuyển vào vùng màu vàng.', 'Bấm "Start" để chơi lại nhé.', 'Cẩn thận! Tàu đỏ sẽ nhanh hơn lúc này.'];
}