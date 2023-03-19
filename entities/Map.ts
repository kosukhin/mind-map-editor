import { Dictionary } from "~/entities/types/Dictionary";

export interface MapObjectRelation {
  id: string,
}

export interface MapObject {
  id: string,
  type: string,
  position: [number, number],
  name: string,
  outlink: string,
  linked: boolean,
  description: string,
  zindex: number,
  arrows: MapObjectRelation[],
  targetBlank: boolean,
  lastClick: number,
}

export interface MapType {
  svg: string,
  width: number,
  height: number,
}

export type MapStructureTypes = Dictionary<MapType>;

export interface MapStructure {
  url: string,
  parent: string,
  types: MapStructureTypes,
  objects: Dictionary<MapObject>
}