export interface MapTypeDocument {
  name: string
  svg: string
  width: number
  height: number
}

export interface MapObjectRelationDocument {
  id: string
  label: string
  beginMapType?: MapTypeDocument,
  endMapType?: MapTypeDocument,
}

export interface MapObjectDocument {
  id: string
  type: string
  position: [number, number]
  name: string
  additionalName: string | null
  outlink: string
  linked: boolean
  description: string
  zindex: number
  arrows: MapObjectRelationDocument[]
  targetBlank: boolean
  lastClick: number
  inMenu: boolean
  menuOrder: number
  width: number
  height: number
  additionalFields?: Record<string, string>
}

export interface MapSettingsDocument {
  colored: boolean
  title: string
  favoriteGroup?: string
  prevFavoriteGroup?: string
  skipSearchIndex?: boolean
}

export interface NamedSearchDocument {
  name: string,
  query: string,
  type: string
}

export interface MapDocument {
  document: string
  url: string
  parent: string
  progress: number
  parentNames?: Record<string, string>
  types: Record<string, MapTypeDocument>
  objects: Record<string, MapObjectDocument>
  position?: [number, number],
  namedSearches?: NamedSearchDocument[],
  settings: MapSettingsDocument
}

export type MapFileDocument = Record<string, MapDocument>;
