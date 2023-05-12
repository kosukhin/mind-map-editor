import { slugify } from 'transliteration'
import { Arrow, MapObject, MapStructure, Nullable } from '~/entities'
import { MAP_DEFAULT_TITLE } from '~/constants'
import { urlTrim } from '~/utils'

export const createMap = (
  document: string,
  title: Nullable<string> = null
): MapStructure => {
  document = title ? slugify(title) : document
  return {
    settings: {
      colored: false,
      title: title ?? MAP_DEFAULT_TITLE,
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
    inMenu: false,
    menuOrder: 0,
    additionalName: '',
  }
}

export function createMapObjectUrl(object: MapObject) {
  let link = object.outlink
    ? object.outlink
    : location.pathname +
      '/' +
      slugify(
        object.name
          ? object.name
          : object.additionalName
          ? object.additionalName
          : ''
      )
  link = urlTrim(link)

  return link
}

export const openUrlByObject = (object: MapObject) => {
  if (object.linked) {
    const link = createMapObjectUrl(object)

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
