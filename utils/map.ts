import { slugify } from 'transliteration'
import { Arrow, MapObject, MapStructure } from '~/entities'
import { MAP_DEFAULT_TITLE } from '~/constants'
import { urlTrim } from '~/utils'

export const createMap = (document: string): MapStructure => {
  return {
    settings: {
      colored: false,
      title: MAP_DEFAULT_TITLE,
    },
    document,
    objects: {},
    types: {},
    url: document,
    parent: '',
  }
}

export const createObject = (
  position: [number, number],
  type: string
): MapObject => {
  return {
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
  }
}

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

export const applyArrowPoints = (
  arrows: [arrow: Arrow, points: number[]][]
) => {
  arrows.forEach(([arrow, points]) => arrow.points(points))
}
