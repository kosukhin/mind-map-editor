import { useRouter } from '@/composables/useRouter';
import { MAP_DEFAULT_TITLE } from '@/constants/messages';
import { Arrow } from '@/entities/Konva';
import { MapObject, MapStructure } from '@/entities/Map';
import { Nullable } from '@/entities/Nullable';
import { urlTrim } from '@/utils/common';
import { getLocation } from '@/utils/globals';
import debounce from 'lodash/debounce';
import { slugify } from 'transliteration';

export const createMap = (
  document: string,
  title: Nullable<string> = null,
): MapStructure => {
  const innerDocument = title ? slugify(title) : document;
  return {
    progress: 0,
    settings: {
      colored: false,
      title: title ?? MAP_DEFAULT_TITLE,
    },
    document: innerDocument,
    objects: {},
    types: {},
    url: innerDocument,
    parent: '',
  };
};

export const createObject = (
  position: [number, number],
  type: string,
): MapObject => ({
  name: '',
  outlink: '',
  linked: false,
  targetBlank: false,
  arrows: [],
  description: '',
  id: Date.now().toString(),
  lastClick: Date.now(),
  position,
  type,
  zindex: 0,
  inMenu: false,
  menuOrder: 0,
  additionalName: '',
});

export function createMapObjectUrl(object: MapObject) {
  let link = object.outlink
    ? object.outlink
    : `${getLocation().pathname
    }/${
      slugify(
        // eslint-disable-next-line no-nested-ternary
        object.name
          ? object.name
          : object.additionalName
            ? object.additionalName
            : '',
      )}`;
  link = urlTrim(link);
  return link;
}

export const createMapFileNameFromUrl = (object: MapStructure) => {
  const { url } = object;
  let docName = `${url.replaceAll('/', '_')}.json`;
  const underscores = docName.match(/_/g);
  if (underscores && underscores.length === 1) {
    docName = docName.slice(1);
  }
  return slugify(docName);
};

const openExternalLink = debounce((link: string) => {
  window.open(link);
}, 200);

export const openUrlByObject = (object: MapObject) => {
  if (object?.linked) {
    const link = createMapObjectUrl(object);
    if (object.targetBlank) {
      openExternalLink(link);
    } else {
      const router = useRouter();
      router.push(link);
      // location.href = link
    }
    return true;
  }
  return false;
};

export const applyArrowPoints = (
  arrows: [arrow: Arrow, points: number[]][],
) => {
  arrows.forEach(([arrow, points]) => arrow.points(points));
};
