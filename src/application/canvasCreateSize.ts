import { Size } from '@/entities';

export const canvasCreateSize = (canvasElement: HTMLElement): Size => ({
  w: canvasElement.clientWidth,
  h: canvasElement.clientHeight,
});
