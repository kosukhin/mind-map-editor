/**
 * Данные типа узла карты
 */
export interface MapTypeDocument {
  id: string,
  name: string
  svg: string
  width: number
  height: number
}

export type MapTypeWithNameDocument = {name: string, type: MapTypeDocument}

/**
 * Данные связи между объектами карты
 */
export interface MapObjectRelationDocument {
  id: string
  label: string
  beginMapType?: MapTypeDocument,
  endMapType?: MapTypeDocument,
}

/**
 * Данные одного объекта карты
 */
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

/**
 * Данные настроек карты
 */
export interface MapSettingsDocument {
  colored: boolean
  title: string
  favoriteGroup?: string
  prevFavoriteGroup?: string
  skipSearchIndex?: boolean
}

/**
 * Данные для именованных поисков
 */
export interface NamedSearchDocument {
  name: string,
  query: string,
  type: string
}

/**
 * Данные одной карты
 */
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

/**
 * Данные всего файла с картами
 */
export type MapFileDocument = Record<string, MapDocument>;
