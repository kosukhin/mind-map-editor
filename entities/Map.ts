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

export interface MapStructure {
  url: string,
  parent: string,
  types: Record<string, MapType>,
  objects: Record<string, MapObject>
}