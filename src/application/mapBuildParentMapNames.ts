import { isTruthy } from '@/utils/comparators';

const nameSeparator = '_';

export const mapBuildParentMapNames = (name: string) => {
  const nameParts = name.split(nameSeparator).filter(isTruthy).reduce((acc: string[], v) => {
    acc.push(`${acc.at(-1) ?? ''}_${v}`);
    return acc;
  }, []);

  // Для первой карты не может быть нижнего подчеркивания вначале
  [nameParts[0]].filter(isTruthy).forEach((v) => {
    nameParts[0] = v.slice(1);
  });

  // Родительское название не могут совпасть с текущим
  return nameParts.filter((v) => v !== name);
};
