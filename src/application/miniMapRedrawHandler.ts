import { MINIMAP_SCALE } from '@/constants/system';
import { setElementPosition } from '@/utils/dom';
import { Stage } from 'konva/lib/Stage';

type Params = [Stage, HTMLElement]

export const miniMapRedrawHandler = ([vStage, vMiniMapScreen]: Params) => {
  const scale = MINIMAP_SCALE;
  const calculateMiniScreen = (): [HTMLElement, number, number] => {
    const miniScreenX = vStage.x() * scale * -1;
    const miniScreenY = vStage.y() * scale * -1;
    setElementPosition(vMiniMapScreen, [miniScreenY, miniScreenX]);
    return [vMiniMapScreen, miniScreenX, miniScreenY];
  };
  return {
    calculateMiniScreen,
  };
};
