import {MapObject} from "~/entities";
import {slugify} from 'transliteration';

export const openUrlByObject = (object: MapObject) => {
  if (object.linked) {
    const link = object.outlink
      ? object.outlink
      : location.href + '/' + slugify(object.name);

    if (object.targetBlank) {
      window.open(link);
    } else {
      location.href = link;
    }

    return true;
  }

  return false;
}
