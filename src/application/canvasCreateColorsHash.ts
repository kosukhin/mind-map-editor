import { colorsMap } from '@/constants/system';
import { Dictionary } from '@/entities/Dictionary';
import { MapStructure } from '@/objects/entities/MapStructures';

export const canvasCreateColorsHash = (
  vMap: MapStructure,
): Dictionary<string> => {
  if (!vMap.settings.colored) {
    return {};
  }
  const clicks = Object.values(vMap.objects).map((obj) => obj.lastClick);
  clicks.sort((a, b) => a - b);
  const chunk = Math.ceil(clicks.length / 3);
  let groups = {};
  for (let i = 0; i < clicks.length; i += chunk) {
    const color = colorsMap.shift();
    groups = {
      ...groups,
      ...clicks.slice(i, i + chunk).reduce((acc: Dictionary<string>, time) => {
        acc[time] = String(color);
        return acc;
      }, {}),
    };
  }
  return groups;
};
