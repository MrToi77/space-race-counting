// src/scenes/ShapeScene.ts

import Phaser from 'phaser';

export default class ShapeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ShapeScene' });
  }

  preload() {
    // 1) Load SVG dưới dạng text
    this.load.text('svgData', 'assets/track.svg');
  }

  create() {
    // 2) Lấy chuỗi SVG và parse thành DOM
    const svgText = this.cache.text.get('svgData') as string;
    const parser = new DOMParser();
    console.log(svgText);
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const group = doc.getElementById('path_display');
    if (!group) {
      console.warn('Không tìm thấy <g id="path_display">');
      return;
    }

    // 3) Tạo Graphics
    const g = this.add.graphics();

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
    group.querySelectorAll<SVGElement>('rect, polygon').forEach(el => {
      // Đọc fill & stroke
      const fillAttr   = el.getAttribute('fill')   || '#ffffff';
      const strokeAttr = el.getAttribute('stroke') || '#000000';
      const fillColor   = parseInt(fillAttr.replace('#',''), 16);
      const strokeColor = parseInt(strokeAttr.replace('#',''), 16);

      // Parse transform
      const matrix = parseTransform(el.getAttribute('transform'));

      g.lineStyle(1, strokeColor, 1);
      g.fillStyle(fillColor, 1);
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
          const [vx, vy] = applyMatrix(px, py, matrix);
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
          const [vx, vy] = applyMatrix(px, py, matrix);
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
