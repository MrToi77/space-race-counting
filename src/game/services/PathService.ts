// @ts-ignore
import svgToPhaserPath from 'svg-to-phaser-path';

import { Curves } from "phaser";
import PlaySceneDeclare from "../Declare/PlaySceneDeclare";

const MaxSpaceBetweenNodes = 5;
const MinSpaceBetweenNodes = 0;
export default class PathService{
    private declare: PlaySceneDeclare;
    private scene: Phaser.Scene;
    constructor(scene: Phaser.Scene, declare: PlaySceneDeclare){
        this.scene = scene;
        this.declare = declare;

        const d = `M179.557,430.513c0,0,29.641,0,51.302-17
        c21.661-17,39.941-42.742,88.922-41c33.055,1.174,73.32,45.83,128.826,61c74.576,20.381,131.104,22,133.384-11
        c2.628-38.049-120.684-37.035-156.185-47c-57.002-16-75.903-46.795-51.963-64.795c23.941-18,57.664-3.205,73.624,5.795
        c15.961,9,98.043,41.02,137.944,42c33.359,0.818,115.144-3.668,115.144-52c0-34-47.881-56-92.342-47c-44.463,9-72.964,48-132.245,26
        s-71.822-45-116.285-35c-71.363,16.051-149.459,95.412-198.367,103c-49.061,7.609-90.063-24-82.936-63.549
        c4.647-25.791,26.037-37.271,57.221-33.301c34.113,4.344,76.324,18.312,103.44,10.617c18.707-5.309,38.515-35.715-0.001-45.367
        c-36.831-9.23-80.084-14.822-82.285-40.401c-2.251-26.175,45.016-35.305,88.337-23.305c43.321,12,128.353,36.151,165.065,44.401
        c66.577,14.962,119.395,16.892,157.908,3.378c22.429-7.869,74.828-39.092,74.828-39.092`;

        const jsonPath = svgToPhaserPath(d, true);

        this.createValidNode(jsonPath);
    }

    private createValidNode(jsonPath: any){
        const offSetY = 0;
        this.declare.path = new Curves.Path();
        this.declare.path.fromJSON(jsonPath);
    
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0xffffff);
        graphics.y -= offSetY;
        this.declare.path.draw(graphics);
    
        const validIndices: number[] = [0];

        let i = Phaser.Math.Between(MinSpaceBetweenNodes + 1, MaxSpaceBetweenNodes);
        while (i < this.declare.amountOfNode - 1) {
            validIndices.push(i);
            i += Phaser.Math.Between(MinSpaceBetweenNodes, MaxSpaceBetweenNodes);
        }

        validIndices.push(this.declare.amountOfNode - 1);
    
        for (let i = 0; i < this.declare.amountOfNode; i++) {
            const t = i / (this.declare.amountOfNode - 1);
            const { x, y } = this.declare.path.getPoint(t)!;
            const yOff = y - offSetY;
            this.declare.points.push(new Phaser.Math.Vector2(x, yOff));
    
            const isValid = validIndices.includes(i);
            this.declare.validNodes.push(isValid);
    
            this.scene.add.circle(x, yOff, 3, isValid ? 0x4caf50 : 0xf44336);
        }
    }
    
}