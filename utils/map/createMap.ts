import { MapStructure } from '~/entities'

export const createMap = (document: string): MapStructure => {
  return {
    document,
    objects: {},
    types: {},
    url: document,
    parent: '',
  }
}
