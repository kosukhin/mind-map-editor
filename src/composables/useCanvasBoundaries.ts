import partial from 'lodash/partial';
import { canvasRestrictBoundaries } from '@/application';
import { useCanvas } from '@/composables';
import { DEFAULT_BOUNDARIES } from '@/constants';
import { Size, Vector2d } from '@/entities';
import { FType } from '@/entities/Utils';

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
