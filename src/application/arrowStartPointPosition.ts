import { ShapeGeometry } from '@/types/shapeGeometry';
import { ShapePosition } from '@/types/shapePosition';

export const arrowStartPointPosition = (
  shapeGeometry: ShapeGeometry,
  shapePosition: ShapePosition,
  lookToPosition: ShapePosition,
): ShapePosition => {
  const dx = shapePosition.x - lookToPosition.x;
  const dy = shapePosition.y - lookToPosition.y;
  const isModuleDYGreater = Math.abs(dy) > Math.abs(dx);
  let { x, y } = shapePosition;

  const top = isModuleDYGreater && dy >= 0;
  const right = !isModuleDYGreater && dx >= 0;
  const bottom = isModuleDYGreater && dy < 0;
  const left = !isModuleDYGreater && dx < 0;

  if (top) {
    x += Math.round(shapeGeometry.width / 2);
  } else if (left) {
    y += Math.round(shapeGeometry.height / 2);
    x += shapeGeometry.width;
  } else if (bottom) {
    x += Math.round(shapeGeometry.width / 2);
    y += shapeGeometry.height;
  } else if (right) {
    y += Math.round(shapeGeometry.height / 2);
  }

  return { x, y };
};
