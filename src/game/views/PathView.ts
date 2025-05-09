import PlaySceneDeclare from "../Declare/PlaySceneDeclare";
let indexBox = 0;
export default class PathView{
    private scene : Phaser.Scene;
    private data: string;
    private declare: PlaySceneDeclare;
    constructor(scene: Phaser.Scene, data: string, declare: PlaySceneDeclare){
        this.scene = scene;
        this.data = data;
        this.declare = declare;
        this.CreatePath();
    }

    private CreatePath(){
    const offSetY = 0;
    const svgText = this.data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const group = doc.getElementById('path_display');
    if (!group) {
      console.warn('Không tìm thấy <g id="path_display">');
      return;
    }

    // 3) Tạo Graphics
    const g = this.scene.add.graphics();

    // Hàm phụ để parse transform matrix và áp lên điểm (x,y)
    function applyMatrix(x: number, y: number, matrix: number[]): [number, number] {
      const [a, b, c, d, e, f] = matrix;
      // newX = a*x + c*y + e; newY = b*x + d*y + f
      return [a * x + c * y + e, b * x + d * y + f];
    }

    // Hàm phụ: đọc transform="matrix(a b c d e f)"
    function parseTransform(t: string|null): number[] {
      if (!t) return [1, 0, 0, 1, 0, 0];
      const m = t.match(/matrix\(([^)]+)\)/);
      if (!m) return [1, 0, 0, 1, 0, 0];
      return m[1].split(/[\s,]+/).map(n => parseFloat(n));
    }

    // 4) Duyệt từng element con
    group.querySelectorAll<SVGElement>('[data-index]').forEach(el => {
      const idx = parseInt(el.getAttribute('data-index')!, 10);
      const isValid = this.declare.validNodes[idx];
    
      // set màu vàng nếu valid, trắng nếu không
      g.fillStyle(isValid ? 0xFFFF00 : 0xFFFFFF, 1);
      g.lineStyle(1, 0x000000, 1);
    
      // Parse transform
      const matrix = parseTransform(el.getAttribute('transform'));

      g.beginPath();

      if (el.tagName === 'rect') {
        // Lấy thông số rect
        const x      = parseFloat(el.getAttribute('x')!);
        const y      = parseFloat(el.getAttribute('y')!);
        const w      = parseFloat(el.getAttribute('width')!);
        const h      = parseFloat(el.getAttribute('height')!);
        // 4 điểm góc
        const pts: [number,number][] = [
          [x,   y  ],
          [x+w, y  ],
          [x+w, y+h],
          [x,   y+h],
        ];
        // Vẽ path
        pts.forEach(([px,py], i) => {
          let [vx, vy] = applyMatrix(px, py, matrix);
          vy -= offSetY;
          if (i === 0) g.moveTo(vx, vy);
          else         g.lineTo(vx, vy);
        });
        g.closePath();
      }
      else if (el.tagName === 'polygon') {
        // Lấy chuỗi "x1,y1 x2,y2 ..."
        const ptsRaw = el.getAttribute('points')!.trim().split(/\s+/);
        ptsRaw.forEach((pair, i) => {
          const [px, py] = pair.split(',').map(v => parseFloat(v));
          let [vx, vy] = applyMatrix(px, py, matrix);
          vy -= offSetY;
          if (i === 0) g.moveTo(vx, vy);
          else         g.lineTo(vx, vy);
        });
        g.closePath();
      }

      // Stroke + fill
      g.fillPath();
      g.strokePath();
    });
    }
}