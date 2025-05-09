import PlaySceneDeclare from "../Declare/PlaySceneDeclare";
import PathService from "../services/PathService";
export default class PathController{
    private scene: Phaser.Scene;
    private declare: PlaySceneDeclare;

    constructor(scene: Phaser.Scene, declare: PlaySceneDeclare){
        this.scene = scene;
        this.declare = declare;
        const service = new PathService(this.scene, this.declare);
    }

}