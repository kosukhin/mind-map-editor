import { MapObjectStructure, MapStructure } from '@/objects/entities/MapStructures';
import { withList } from '@/utils/withList';
import { isNullish } from '@/utils/isNullish';
import { doLater } from '@/utils/doLater';
import { setEmptyObject } from '@/utils/setEmptyObject';
import { regexpMatches } from '@/utils/regexpMatches';
import { buildMapFromArray } from '@/utils/buildMapFromArray';

const variableRegexp = /\$\{([a-zA-Z1-9]+)\}/g;
/**
 * В шаблонах SVG типов узлов могут быть переменные
 * нужно эти переменные сделать моделью объекта карты
 */
export const currentObjectSetAdditionalFields = (theMap: MapStructure, theObject: MapObjectStructure) => {
  const type = theMap.types[theObject.type];

  withList([theObject.additionalFields])
    .ensureEvery(isNullish)
    .tap(
      doLater(setEmptyObject, 'additionalFields', theObject),
    )
    .tap(() => {
      const fields = regexpMatches(type.svg, variableRegexp);
      const neededFields = fields.filter(
        (v) => v !== 'width' && v !== 'height',
      );
      theObject.additionalFields = buildMapFromArray(neededFields);
    });
};
