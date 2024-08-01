import { Application } from '@/objects/application/Application';
import { CanvasOf } from '@/objects/canvas/CanvasOf';
import { FileFromFS } from '@/objects/file/FileFromFS';

export class ApplicationBase implements Application {
  constructor(private canvasElement?: HTMLElement) {}

  setup(): void {
    if (!this.canvasElement) {
      throw new Error('ApplicationBase: canvas element was not found!');
    }
    console.log('draw something');
    const canvas = new CanvasOf(this.canvasElement);
    const file = new FileFromFS();
    canvas.render();
  }
}
