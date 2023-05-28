import { Dictionary } from '~/entities/Dictionary'

export interface MapObjectRelation {
  id: string
}

export interface MapObject {
  id: string
  type: string
  position: [number, number]
  name: string
  additionalName: string | null
  outlink: string
  linked: boolean
  description: string
  zindex: number
  arrows: MapObjectRelation[]
  targetBlank: boolean
  lastClick: number
  inMenu: boolean
  menuOrder: number
}

export interface MapType {
  name: string
  svg: string
  width: number
  height: number
}

export type MapStructureTypes = Dictionary<MapType>

export interface MapSettings {
  colored: boolean
  title: string
}

export interface MapStructure {
  document: string
  url: string
  parent: string
  progress: number
  parentNames?: Dictionary<string>
  settings: MapSettings
  types: MapStructureTypes
  objects: Dictionary<MapObject>
}

export interface Map {
  document: string
  structure: MapStructure
}

export interface MapResponse {
  ok: boolean
  data: Map
  parentTypes: MapType[]
}
