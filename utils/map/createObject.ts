import { MapObject } from '~/entities'

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
