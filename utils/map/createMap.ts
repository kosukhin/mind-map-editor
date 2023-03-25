import { MapStructure } from "~/entities";

export const createMap = (document: string): MapStructure => {
  return {
    document: document,
    objects: {},
    types: {},
    url: document,
    parent: '',
  }
}
