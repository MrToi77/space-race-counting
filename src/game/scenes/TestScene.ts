// @ts-ignore
import svgToPhaserPath from 'svg-to-phaser-path';

import { Curves } from "phaser";

export class YourScene extends Phaser.Scene {
    ship!: Phaser.GameObjects.PathFollower;

    constructor() {
        super("YourScene");
    }

    preload() {
        this.load.image("ship", "assets/product.png");
    }

    create() {
        const d = `M179.557,430.513c0,0,29.641,0,51.302-17
	c21.661-17,39.941-42.742,88.922-41c33.055,1.174,73.32,45.83,128.826,61c74.576,20.381,131.104,22,133.384-11
	c2.628-38.049-120.684-37.035-156.185-47c-57.002-16-75.903-46.795-51.963-64.795c23.941-18,57.664-3.205,73.624,5.795
	c15.961,9,98.043,41.02,137.944,42c33.359,0.818,115.144-3.668,115.144-52c0-34-47.881-56-92.342-47c-44.463,9-72.964,48-132.245,26
	s-71.822-45-116.285-35c-71.363,16.051-149.459,95.412-198.367,103c-49.061,7.609-90.063-24-82.936-63.549
	c4.647-25.791,26.037-37.271,57.221-33.301c34.113,4.344,76.324,18.312,103.44,10.617c18.707-5.309,38.515-35.715-0.001-45.367
	c-36.831-9.23-80.084-14.822-82.285-40.401c-2.251-26.175,45.016-35.305,88.337-23.305c43.321,12,128.353,36.151,165.065,44.401
	c66.577,14.962,119.395,16.892,157.908,3.378c22.429-7.869,74.828-39.092,74.828-39.092`;

        const jsonPath = svgToPhaserPath(d, true);
        const path = new Curves.Path();
        path.fromJSON(jsonPath);

        this.add.graphics().lineStyle(2, 0xffffff).strokePath();

        this.ship = this.add.follower(path, 100, 500, "ship");

        this.ship.startFollow({
            duration: 15000,
            repeat: -1,
            rotateToPath: true,
        });
    }
}
