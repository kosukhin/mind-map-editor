import { Canvas } from '@/objects/canvas/Canvas';
import { TextOf } from '@/objects/text/TextOf';
import { TextUppercase } from '@/objects/text/TextUppercase';
import { TextAngry } from '@/objects/text/TextAngry';

export class CanvasOf implements Canvas {
  private titleTemplate = new TextAngry(new TextUppercase(new TextOf('')));

  public constructor(private canvasElement: HTMLElement) {}

  render(): void {
    const title = this.titleTemplate.clone('Приложение');
    console.log(title.string());
  }
}
