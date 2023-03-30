import { slugify } from 'transliteration'
import { MapObject } from '~/entities'
import { urlTrim } from '~/utils'

export const openUrlByObject = (object: MapObject) => {
  if (object.linked) {
    let link = object.outlink
      ? object.outlink
      : location.href + '/' + slugify(object.name)
    link = urlTrim(link)

    if (object.targetBlank) {
      window.open(link)
    } else {
      location.href = link
    }

    return true
  }

  return false
}
