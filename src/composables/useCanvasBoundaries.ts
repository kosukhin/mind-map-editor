import partial from 'lodash/partial';
import { FType } from '@/entities/Utils';
import { useCanvas } from '@/composables/useCanvas';
import { Size } from '@/entities/Size';
import { Vector2d } from '@/entities/Konva';
import { canvasRestrictBoundaries } from '@/application/canvasRestrictBoundaries';
import { DEFAULT_BOUNDARIES } from '@/constants/system';

const { canvasSize } = useCanvas();

const restrictBoundaries = (
  getCanvasSize: FType<Size | undefined>,
  pos: Vector2d,
) => {
  const innerCanvasSize = getCanvasSize();
  return innerCanvasSize
    ? canvasRestrictBoundaries(pos)(innerCanvasSize)
    : DEFAULT_BOUNDARIES;
};

const module = {
  restrictBoundaries: partial(restrictBoundaries, () => canvasSize.value),
};

export const useCanvasBoundaries = () => module;
