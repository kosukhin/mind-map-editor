export interface MapTypeStructure {
  name: string
  svg: string
  width: number
  height: number
}

export interface MapObjectRelationStructure {
  id: string
  label: string
  beginMapType?: MapTypeStructure,
  endMapType?: MapTypeStructure,
}

export interface MapObjectStructure {
  id: string
  type: string
  position: [number, number]
  name: string
  additionalName: string | null
  outlink: string
  linked: boolean
  description: string
  zindex: number
  arrows: MapObjectRelationStructure[]
  targetBlank: boolean
  lastClick: number
  inMenu: boolean
  menuOrder: number
  width: number
  height: number
  additionalFields?: Record<string, string>
}

export interface MapSettingsStructure {
  colored: boolean
  title: string
  favoriteGroup?: string
  prevFavoriteGroup?: string
  skipSearchIndex?: boolean
}

export interface NamedSearchStructure {
  name: string,
  query: string,
  type: string
}

export interface MapStructure {
  document: string
  url: string
  parent: string
  progress: number
  parentNames?: Record<string, string>
  types: Record<string, MapTypeStructure>
  objects: Record<string, MapObjectStructure>
  position?: [number, number],
  namedSearches?: NamedSearchStructure[]
}

export type MapFileStructure = Record<string, MapStructure>;
