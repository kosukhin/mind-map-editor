import { Size } from '@/entities/Size';

export const canvasCreateSize = (canvasElement: HTMLElement): Size => ({
  w: canvasElement.clientWidth,
  h: canvasElement.clientHeight,
});
