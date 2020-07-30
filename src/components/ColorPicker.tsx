import * as React from 'react';
import { Component } from 'react';

import * as colorUtil from 'scripts/colorutil';

import Style from 'style/color-picker.module.sass';
import { store } from 'App';

interface Propterties {
  size?: number;
}

class ColorPicker extends React.Component<Propterties> {
  private foregroundCanvas: React.RefObject<HTMLCanvasElement>;
  private backgroundCanvas: React.RefObject<HTMLCanvasElement>;
  private isMouseDown: boolean = false;

  constructor(props: Propterties) {
    super(props);
    this.foregroundCanvas = React.createRef();
    this.backgroundCanvas = React.createRef();
  }

  componentDidMount() {
    const bg = this.backgroundCanvas.current as HTMLCanvasElement;
    const fg = this.foregroundCanvas.current as HTMLCanvasElement;
    const size = this.props.size ?? 350;
    const ctxBg = bg.getContext('2d');
    const ctxFg = fg.getContext('2d');

    if (ctxBg == null || ctxFg == null) return;
    bg.width = size + 5;
    bg.height = size + 5;
    fg.width = size + 5;
    fg.height = size + 5;

    colorUtil.drawColorWheel(ctxBg, size);

    fg.onmousedown = () => (this.isMouseDown = true);
    fg.onmouseup = () => (this.isMouseDown = false);
    fg.onmouseleave = () => (this.isMouseDown = false);
    fg.addEventListener('mousemove', (evt: MouseEvent) => {
      if (!this.isMouseDown) return;

      const isInsideRadius = (mouseX: number, mouseY: number, radius: number): boolean =>
        Math.sqrt(Math.pow(mouseX - size / 2, 2) + Math.pow(mouseY - size / 2, 2)) < radius - 1 / Number.MAX_VALUE;

      const { x, y } = getMousePos(fg, evt);
      if (!isInsideRadius(x, y, size / 2)) return;
      const imageData = ctxBg.getImageData(x, y, 1, 1).data;
      const hex = '#' + ('000000' + colorUtil.rgbToHex(imageData[0], imageData[1], imageData[2])).slice(-6);

      const clear = () => ctxFg.clearRect(0, 0, fg.width, fg.height);
      const draw = () => {
        store.color = hex;

        ctxFg.strokeStyle = '#ffffff';
        ctxFg.fillStyle = hex;
        ctxFg.lineWidth = 5;
        ctxFg.beginPath();
        ctxFg.arc(x, y, size / 50, 0, 2 * Math.PI);
        ctxFg.stroke();
        ctxFg.fill();
        ctxFg.closePath();

        ctxFg.lineWidth = 2.5;
        ctxFg.beginPath();
        ctxFg.moveTo(size / 2, size / 2);
        ctxFg.lineTo(x - size / 50, y - size / 50);
        ctxFg.stroke();
        ctxFg.closePath();
      };

      clear();
      draw();
    });

    const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent) => {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    };
  }

  render() {
    return (
      <div className={Style.ColorPicker}>
        <canvas ref={this.foregroundCanvas} className={Style.canvas} style={{ zIndex: 1, width: this.props.size ?? 350 }}></canvas>
        <canvas ref={this.backgroundCanvas} className={Style.canvas} style={{ zIndex: 0, width: this.props.size ?? 350 }}></canvas>
      </div>
    );
  }
}

export default ColorPicker;
