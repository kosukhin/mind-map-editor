import { ChainType } from 'patron-oop';
import { Factory } from 'patron-oop';
import { FactoryType } from 'patron-oop';
import { Guest } from 'patron-oop';
import { GuestAware } from 'patron-oop';
import { GuestAwareType } from 'patron-oop';
import { GuestCast } from 'patron-oop';
import { GuestChain } from 'patron-oop';
import { GuestObjectType } from 'patron-oop';
import { GuestSync } from 'patron-oop';
import { GuestType } from 'patron-oop';
import { GuestValueType } from 'patron-oop';
import { Layer } from 'konva/lib/Layer';
import { Patron } from 'patron-oop';
import { PatronOnce } from 'patron-oop';
import { PatronPool } from 'patron-oop';
import { PoolType } from 'patron-oop';
import { Ref } from 'vue';
import { Source } from 'patron-oop';
import { SourceEmpty } from 'patron-oop';
import { SourceType } from 'patron-oop';

declare interface ArrowPathType {
    breakPoints(fromPoint: ArrowPointDocument, toPoint: ArrowPointDocument, pointsGuest: GuestObjectType<number[]>): this;
    clear(): void;
}

declare type ArrowPointDocument = {
    shapeGeometry: SizeDocument;
    shapePosition: PointDocument;
    lookToGeometry: SizeDocument;
    lookToPosition: PointDocument;
};

declare class Breadcrumbs {
    private parentNames;
    private mapFile;
    private factories;
    constructor(parentNames: MapObjectParentNamesType, mapFile: MapFileType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guestCast: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    list<R extends GuestObjectType<unknown[]>>(guest: R): R;
}

declare class BrowserCanvas implements BrowserCanvasType {
    private factories;
    private canvasCache;
    constructor(factories: {
        sourceEmpty: FactoryType<SourceType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    canvas(guest: GuestObjectType<HTMLElement>): this;
    size(guest: GuestObjectType<SizeDocument_2>): this;
    give(value: HTMLElement): this;
}

declare interface BrowserCanvasType extends GuestObjectType<HTMLElement> {
    canvas(guest: GuestObjectType<HTMLElement>): this;
    size(guest: GuestObjectType<SizeDocument>): this;
}

declare class BrowserFileSaved implements BrowserFileType {
    private fileHandler;
    constructor(fileHandler: FileSystemFileHandle);
    save(content: string): this;
}

declare interface BrowserFileType {
    save(content: string): this;
}

export declare class BrowserLaunchQueue implements BrowserLaunchQueueType {
    private launchQueue;
    private isLaunchQueueSupported;
    private isCalculated;
    constructor(launchQueue?: LaunchQueueType, isLaunchQueueSupported?: boolean);
    fileHandler(guest: GuestObjectType<FileSystemFileHandle>): this;
}

declare interface BrowserLaunchQueueType {
    fileHandler(guest: GuestObjectType<FileSystemFileHandle>): this;
}

declare interface CheckNotificationType<T> {
    breakOnFail(value: T, guest: GuestObjectType<true>): this;
    continueOnFail(value: T, guest: GuestObjectType<true | string>): this;
}

/**
 * Комбинация с клавишей ctrl
 */
declare class ControlCombo {
    private keyboard;
    private factories;
    constructor(keyboard: Keyboard, factories: {
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    /**
     * Случилась комбинация ctrl + keyCode
     */
    happened(keyCode: string, eventGuest: GuestObjectType<KeyboardEvent>): void;
    /**
     * Случилась комбинация ctrl + keyCode с условием comboCondition
     */
    happenedConditional(keyCode: string, comboCondition: GuestAwareType<boolean>, eventGuest: GuestObjectType<KeyboardEvent>): void;
}

declare type CountDocument = {
    count: number;
    nearestObjectId: string;
};

declare class Device implements GuestAwareType<DeviceDocument> {
    private windowWidth;
    private mobileLimit;
    constructor(windowWidth: GuestAwareType<number>, mobileLimit?: number);
    value(guest: GuestType<DeviceDocument>): this;
}

declare type DeviceDocument = {
    isMobile: boolean;
    isDesktop: boolean;
};

declare class DocumentTitle implements GuestObjectType<string> {
    constructor(title: GuestAwareType<string>);
    give(value: string): this;
    introduction(): "patron";
}

declare class Drawer implements GuestObjectType<string> {
    private keyboard;
    private factories;
    private drawerNameCache;
    constructor(keyboard: Keyboard, factories: {
        cache: FactoryType<SourceType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        guestAware: FactoryType<GuestAwareType>;
    });
    isOpenedByName<R extends GuestObjectType<boolean>>(name: string, guest: R): R;
    openedByName(name: string): GuestAwareType<boolean>;
    give(value: string): this;
}

declare interface EditorSettings {
    readonly: boolean;
    presets: Record<string, MapTypeDocument[]>;
}

export declare class FileSystemContent implements MapFileContentType {
    private launchQueue;
    private notification;
    private factories;
    private contentPatrons;
    private fileHandler;
    private contentSource;
    constructor(launchQueue: BrowserLaunchQueueType, notification: NotificationType, factories: {
        fileHandlerContent: FactoryType<SystemFileType>;
        browserFileSaved: FactoryType<BrowserFileType>;
        guest: FactoryType<GuestObjectType>;
        pool: FactoryType<PoolType>;
        sourceEmpty: FactoryType<SourceType>;
    });
    content(target: GuestObjectType<string>): this;
    give(value: string): this;
    canBeUsed(guest: GuestObjectType<boolean>): GuestObjectType<boolean>;
}

export declare class FirstPossibleFileContent implements MapFileContentType {
    private firstPossibleFileContent;
    private contentSource;
    private canBeUsedSource;
    constructor(fileContents: MapFileContentType[], factories: {
        guest: FactoryType<GuestObjectType>;
        patronOnce: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
    });
    canBeUsed<R extends GuestObjectType<boolean>>(guest: R): R;
    content(target: GuestObjectType<string>): this;
    give(value: string): this;
}

declare class Fps {
    value<R extends GuestObjectType<number>>(guest: R): R;
}

declare class JSONP implements JSONPType {
    private callbackName;
    private url;
    private emptyValue;
    private factories;
    private loadingCache;
    constructor(callbackName: string, url: string, emptyValue: unknown, factories: {
        guest: FactoryType<GuestObjectType>;
        sourceEmpty: FactoryType<SourceType>;
    });
    content<R extends GuestObjectType>(guest: R): R;
    loading<R extends GuestObjectType<boolean>>(guest: R): R;
}

declare interface JSONPType {
    content(guest: GuestObjectType): GuestObjectType;
}

declare class Keyboard {
    private pressedPool;
    private combinationsPool;
    constructor(factories: {
        pool: FactoryType<PoolType>;
    });
    pressed(guest: GuestObjectType<string>): this;
    event(guest: GuestObjectType<KeyboardEvent>): this;
}

declare type KonvaLayer = Layer;

declare class KonvaLayer_2 implements LayerBase {
    private canvasDep;
    private stageMoveRestriction;
    private factories;
    private guestChain;
    private positionCache;
    private layerCache;
    constructor(canvasDep: BrowserCanvasType, stageSizeDep: GuestAwareType<SizeDocument>, stageMoveRestriction: StageMoveRestrictionType, factories: {
        chain: FactoryType<ChainType<{
            canvas: HTMLElement;
        }>>;
        cache: FactoryType<SourceType>;
        sourceEmpty: FactoryType<SourceType>;
        guest: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
        guestSync: FactoryType<GuestValueType>;
    });
    layer<R extends GuestObjectType<KonvaLayer>>(guest: R): R;
    position<R extends GuestObjectType<KonvaPointDocument>>(guest: R): R;
    give(value: KonvaLayer): this;
}

declare type KonvaPointDocument = {
    x: number;
    y: number;
};

declare interface LaunchParamsType {
    files: FileSystemFileHandle[];
}

declare interface LaunchQueueType {
    setConsumer(launchParams: (params: LaunchParamsType) => void): void;
}

/**
 * Поведение для работы с характеристиками слоя рендеринга
 */
declare interface LayerBase extends GuestObjectType<KonvaLayer> {
    layer(guest: GuestObjectType<KonvaLayer>): GuestObjectType<KonvaLayer>;
    position(guest: GuestObjectType<PointDocument>): GuestObjectType<PointDocument>;
}

/**
 * Объект для получения основных частей карты - объекты, типы, настройки.
 * и для сохранения карты.
 */
declare class MapCurrent implements MapType {
    private mapFile;
    private mapId;
    private factories;
    private objectsCache;
    private settingsCache;
    private typesCache;
    constructor(mapFile: MapFileType, mapId: MapCurrentIDType, factories: {
        sourceEmpty: FactoryType<SourceType>;
        guest: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
    });
    settings<R extends GuestObjectType<MapSettingsDocument>>(guest: R): R;
    objects<R extends GuestObjectType<MapObjectDocument[]>>(guest: R): R;
    types<R extends GuestObjectType<MapTypeDocument[]>>(guest: R): R;
    give(value: MapDocument): this;
}

declare class MapCurrentID implements MapCurrentIDType {
    private idCache;
    constructor(factories: {
        cache: FactoryType<SourceType>;
    });
    id<R extends GuestObjectType<string>>(guest: R): R;
    give(value: string): this;
}

declare interface MapCurrentIDType extends GuestObjectType<string> {
    id(guest: GuestObjectType<string>): GuestObjectType<string>;
}

/**
 * Данные одной карты
 */
declare interface MapDocument {
    document: string;
    url: string;
    parent: string;
    progress: number;
    parentNames?: Record<string, string>;
    types: Record<string, MapTypeDocument>;
    objects: Record<string, MapObjectDocument>;
    position?: [number, number];
    namedSearches?: NamedSearchDocument[];
    settings: MapSettingsDocument;
    structure?: MapDocument;
}

/**
 * Объект для получения карты и сохранения всего файла с картами
 */
declare class MapFile implements MapFileType {
    private mapFileContent;
    private mapId;
    private factories;
    private currentMapPatrons;
    private mapFileCache;
    constructor(mapFileContent: SourceType<string>, mapId: MapCurrentIDType, factories: {
        pool: FactoryType<PoolType>;
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
        guestCast: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        transformToString: FactoryType<Transformed<string>>;
        transformToObject: FactoryType<Transformed>;
        cache: FactoryType<SourceType>;
    });
    currentMap<R extends GuestObjectType<MapDocument>>(currentMapGuest: R): R;
    give(value: MapFileDocument): this;
    mapFile<R extends GuestObjectType<MapFileDocument>>(mapFileTarget: R): R;
    private createEmptyMapByName;
    private generateEmptyMapFile;
}

/**
 * Поведение для получения контента файла с картами строкой
 */
declare interface MapFileContentType extends GuestObjectType<string> {
    content(target: GuestObjectType<string>): this;
    canBeUsed(guest: GuestObjectType<boolean>): GuestObjectType<boolean>;
}

/**
 * Данные всего файла с картами
 */
declare type MapFileDocument = Record<string, MapDocument>;

/**
 * Поведения для файла с картами
 */
declare interface MapFileType extends GuestObjectType<MapFileDocument> {
    currentMap(target: GuestObjectType<MapDocument>): GuestObjectType<MapDocument>;
    mapFile(target: GuestObjectType<MapFileDocument>): GuestObjectType<MapFileDocument>;
}

/**
 * История изменения карты
 */
declare class MapHistory implements GuestObjectType<MapDocument> {
    private mapFile;
    private map;
    private mapId;
    private factories;
    private mapsHistory;
    private historyIndex;
    constructor(mapFile: MapFileType, map: MapType, mapId: MapCurrentIDType, factories: {
        cache: FactoryType<SourceType>;
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guestCast: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
        patron: FactoryType<GuestObjectType>;
    });
    give(value: MapDocument): this;
    isPrevPossible<R extends GuestObjectType<boolean>>(guest: R): R;
    prev(): void;
    isNextPossible<R extends GuestObjectType<boolean>>(guest: R): R;
    next(): void;
}

declare class MapNameFromUrl {
    private mapUrl;
    private factories;
    constructor(mapUrl: GuestAwareType<string>, factories: {
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    name(guest: GuestObjectType<string>): void;
}

/**
 * Сохранение объекта
 */
declare class MapObject implements MapObjectType {
    private map;
    private mapFile;
    private factories;
    constructor(map: MapType, mapFile: MapFileType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(value: MapObjectDocument): this;
}

declare class MapObjectBackground implements GuestObjectType<MapDocument> {
    private konvaLayer;
    private mapFile;
    private zIndex;
    private factories;
    private mapNameCache;
    constructor(konvaLayer: LayerBase, mapFile: MapFileType, zIndex: GuestObjectType<() => void>, factories: {
        cache: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        patronOnce: FactoryType<GuestObjectType>;
    });
    give(value: MapDocument): this;
}

/**
 * Представление текущего выбранного объекта с логикой
 * бронирования выбранного объекта одним гостем
 */
declare class MapObjectCurrent implements MapObjectCurrentType {
    private drawer;
    private factories;
    private idCache;
    private silenceActivator;
    constructor(drawer: GuestObjectType<string>, factories: {
        sourceEmpty: FactoryType<SourceType>;
        source: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    silenceOn(activator: GuestObjectType<string>): this;
    silenceOff(): this;
    objectId<R extends GuestObjectType<string>>(guest: R): R;
    give(value: string): this;
}

/**
 * Поведения для получения выбранного id объекта
 */
declare interface MapObjectCurrentType extends GuestObjectType<string> {
    objectId(guest: GuestObjectType<string>): GuestObjectType<string>;
}

/**
 * Данные одного объекта карты
 */
declare interface MapObjectDocument {
    id: string;
    type: string;
    position: [number, number];
    name: string;
    additionalName: string | null;
    outlink: string;
    linked: boolean;
    description: string;
    zindex: number;
    arrows: MapObjectRelationDocument[];
    targetBlank: boolean;
    lastClick: number;
    inMenu: boolean;
    menuOrder: number;
    width: number;
    height: number;
    additionalFields?: Record<string, string>;
    createTimestamp: number;
    changeTimestamp: number;
}

/**
 * Добавление нового объекта на карту
 */
declare class MapObjectNew {
    private map;
    private mapObject;
    private canvas;
    private stagePosition;
    private factories;
    constructor(map: MapType, mapObject: MapObjectType, canvas: BrowserCanvas, stagePosition: StagePositionType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    byTypeName(typeName: string, point: PointDocument): this;
}

declare class MapObjectParentNames implements MapObjectParentNamesType {
    private mapId;
    private factories;
    constructor(mapId: MapCurrentIDType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    names<R extends GuestObjectType<string[]>>(guest: R): R;
}

declare interface MapObjectParentNamesType {
    names(guest: GuestObjectType<string[]>): GuestObjectType<string[]>;
}

/**
 * Данные связи между объектами карты
 */
declare interface MapObjectRelationDocument {
    id: string;
    label: string;
    beginMapType?: MapTypeDocument;
    endMapType?: MapTypeDocument;
}

declare class MapObjectRelationRemoved implements GuestObjectType<RelationInformation> {
    private mapObject;
    constructor(mapObject: MapObjectType);
    give(value: RelationInformation): this;
}

declare class MapObjectRemoved implements GuestObjectType<MapObjectDocument> {
    private map;
    private mapFile;
    private checks;
    private factories;
    constructor(map: MapType, mapFile: MapFileType, checks: CheckNotificationType<MapObjectDocument>[], factories: {
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    give(value: MapObjectDocument): this;
}

/**
 * Объект для отрисовки стрелок на конве
 */
declare class MapObjectsArrows {
    private konvaLayer;
    private mapFile;
    private mapDep;
    private arrowPath;
    private factories;
    private previouslyRenderedArrows;
    constructor(konvaLayer: LayerBase, mapFile: MapFileType, mapDep: MapType, arrowPath: ArrowPathType, factories: {
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
        cache: FactoryType<SourceType>;
    });
    introduction(): "patron";
}

/**
 * Связь нескольких объектов стрелкой
 */
declare class MapObjectsLink {
    private mapObjectCurrent;
    private map;
    private mapObject;
    private newArrow;
    private factories;
    private objectIdsCache;
    constructor(mapObjectCurrent: MapObjectCurrent, map: MapType, mapObject: MapObjectType, newArrow: NewArrow, factories: {
        guest: FactoryType<GuestObjectType>;
        cache: FactoryType<SourceType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    objectIds<R extends GuestObjectType<string[]>>(guest: R): R;
    startLink(): void;
}

/**
 * Объект для рендеринга квадратов на конве
 */
declare class MapObjectsRects implements GuestObjectType<MapObjectDocument[]> {
    private konvaLayer;
    private mapFile;
    private mapObject;
    private mapObjectCurrent;
    private mapObjectForRendering;
    private objectPosition;
    private settings;
    private factories;
    private previouslyRenderedRects;
    constructor(konvaLayer: LayerBase, mapFile: MapFileType, mapObject: MapObjectType, mapObjectsVisible: MapObjectsType, mapObjectCurrent: MapObjectCurrentType, mapObjectForRendering: MapObjectType, objectPosition: ObjectPositionType, settings: GuestAwareType<EditorSettings>, factories: {
        patronOnce: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        cache: FactoryType<SourceType>;
        chain: FactoryType<ChainType>;
    });
    give(objects: MapObjectDocument[]): this;
    introduction(): "patron";
}

/**
 * Поведение для получения объектов
 */
declare interface MapObjectsType {
    objects(guest: GuestObjectType<MapObjectDocument[]>): this;
}

/**
 * Объект для определения видимых объектов
 */
declare class MapObjectsVisible implements MapObjectsType {
    private visibleObjectsCache;
    constructor(layerDep: LayerBase, canvas: BrowserCanvas, mapFile: MapFileType, factories: {
        chain: FactoryType<ChainType<unknown>>;
        patron: FactoryType<GuestObjectType<unknown>>;
        guest: FactoryType<GuestObjectType<unknown>>;
    });
    objects(guest: GuestObjectType<MapObjectDocument[]>): this;
    private isInBounding;
}

/**
 * Поведение для сохранения объекта
 */
declare type MapObjectType = GuestObjectType<MapObjectDocument>;

declare class MapObjectUrl {
    private mapId;
    private factories;
    constructor(mapId: MapCurrentIDType, factories: {
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        source: FactoryType<SourceType>;
        mapNameFromUrl: FactoryType<MapNameFromUrl>;
        textNoHtml: FactoryType<TextNoHtml>;
    });
    open(object: MapObjectDocument, openByNameGuest: GuestObjectType<string>): this;
    url<R extends GuestObjectType<string>>(theObject: GuestAwareType<MapObjectDocument>, guest: R): R;
}

declare class MapRemoved implements GuestObjectType<string> {
    private mapFile;
    private mapId;
    private factories;
    constructor(mapFile: MapFileType, mapId: MapCurrentIDType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(mapId: string): this;
}

/**
 * Объект для сохранения настроек карты
 */
declare class MapSettings implements GuestObjectType<MapSettingsDocument> {
    private mapFile;
    private map;
    private factories;
    constructor(mapFile: MapFileType, map: MapType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(newSettings: MapSettingsDocument): this;
}

/**
 * Данные настроек карты
 */
declare interface MapSettingsDocument {
    colored: boolean;
    title: string;
    favoriteGroup?: string;
    prevFavoriteGroup?: string;
    skipSearchIndex?: boolean;
}

/**
 * Поведения для получения частей карты
 */
declare interface MapType extends GuestObjectType<MapDocument> {
    settings(guest: GuestObjectType<MapSettingsDocument>): GuestObjectType<MapSettingsDocument>;
    objects(guest: GuestObjectType<MapObjectDocument[]>): GuestObjectType<MapObjectDocument[]>;
    types(guest: GuestObjectType<MapTypeDocument[]>): GuestObjectType<MapTypeDocument[]>;
}

/**
 * Объект для управления выбранным типом узла карты,
 * например для редактирования типа узла
 */
declare class MapTypeCurrent implements MapTypeCurrentType {
    private idCache;
    constructor(factories: {
        sourceEmpty: FactoryType<SourceType>;
    });
    typeId<R extends GuestObjectType<string>>(guest: R): R;
    give(value: string): this;
}

/**
 * Поведение для выбора типа узла карты
 */
declare interface MapTypeCurrentType extends GuestObjectType<string> {
    typeId(guest: GuestObjectType<string>): GuestObjectType<string>;
}

/**
 * Данные типа узла карты
 */
declare interface MapTypeDocument {
    id: string;
    name: string;
    svg: string;
    width: number;
    height: number;
}

declare class MapTypeNew {
    private mapType;
    constructor(mapType: GuestObjectType<MapTypeWithNameDocument>);
    byName(): void;
}

declare class MapTypeRemoved implements GuestObjectType<MapTypeDocument> {
    private map;
    private mapFile;
    private checks;
    private factories;
    constructor(map: MapType, mapFile: MapFileType, checks: CheckNotificationType<MapTypeWithNameDocument>[], factories: {
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    give(value: MapTypeDocument): this;
}

/**
 * Объект для сохранения типов узлов карты
 */
declare class MapTypes implements GuestObjectType<MapTypeWithNameDocument> {
    private map;
    private mapFile;
    private checks;
    private factories;
    constructor(map: MapType, mapFile: MapFileType, checks: CheckNotificationType<MapTypeWithNameDocument>[], factories: {
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    give(value: MapTypeWithNameDocument): this;
}

declare type MapTypeWithNameDocument = {
    name: string;
    type: MapTypeDocument;
};

/**
 * Контент для вывода меню карты
 */
declare class Menu {
    private mapFile;
    private factories;
    constructor(mapFile: MapFileType, factories: {
        guestInTheMiddle: Factory<GuestObjectType>;
    });
    menuObjects<R extends GuestObjectType<MapObjectDocument[]>>(guest: R): R;
}

/**
 * Объект для построения отображения миникарты
 */
declare class MiniMap {
    private map;
    private layer;
    private stageSize;
    private factories;
    private theSize;
    private thePoints;
    private viewportSizeCache;
    constructor(map: MapType, layer: LayerBase, stageSize: GuestAwareType<SizeDocument>, factories: {
        sourceEmpty: FactoryType<SourceType>;
        chain: FactoryType<ChainType<unknown>>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guestCast: FactoryType<GuestObjectType>;
    });
    viewportPosition<R extends GuestObjectType<PointDocument>>(guest: R): R;
    viewportSize<R extends GuestObjectType<SizeDocument>>(guest: R): R;
    size<R extends GuestObjectType<SizeDocument>>(guest: R): R;
    points<R extends GuestObjectType<PointIdDocument[]>>(guest: R): R;
}

declare class Modal implements GuestObjectType<string> {
    private keyboard;
    private factories;
    private modalNameCache;
    constructor(keyboard: Keyboard, factories: {
        cache: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        guestAware: FactoryType<GuestAwareType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    isOpenedByName<R extends GuestObjectType<boolean>>(name: string, guest: R): R;
    openedByName(name: string): GuestAwareType<boolean>;
    give(value: string): this;
}

/**
 * Данные для именованных поисков
 */
declare interface NamedSearchDocument {
    name: string;
    query: string;
    type: string;
}

/**
 * Новая стрелка, появляется при создании новой связи
 */
declare class NewArrow {
    private konvaLayer;
    private cursorPosition;
    private arrowPath;
    private factories;
    private cursorGuest;
    private arrowCache;
    constructor(konvaLayer: LayerBase, cursorPosition: GuestAwareType<PointDocument>, arrowPath: ArrowPathType, factories: {
        sourceEmpty: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    /**
     * Создать новую стрелку для объекта
     */
    forObject(object: MapObjectDocument): void;
    /**
     * Отмена стрелки
     */
    dispose(): void;
}

/**
 * Объект для отображения уведомлений
 */
declare class Notification_2 implements NotificationType {
    private messageCache;
    private notificationLifetimeDelay;
    private lastTimerHead;
    constructor(factories: {
        sourceEmpty: FactoryType<SourceType<unknown>>;
    });
    message<R extends GuestObjectType<NotificationDocument>>(guest: R): R;
    give(value: NotificationDocument): this;
}

declare interface NotificationDocument {
    text: string;
    type: 'error' | 'success';
}

declare interface NotificationType extends GuestObjectType<NotificationDocument> {
    message(guest: GuestObjectType<NotificationDocument>): GuestObjectType<NotificationDocument>;
}

declare class NumberChunks {
    private chunksCount;
    private baseNumber;
    private factories;
    constructor(chunksCount: number, baseNumber: GuestAwareType<number>, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    chunks<R extends GuestObjectType<number[]>>(guest: R): R;
}

declare class ObjectAdditionalFieldsFix implements GuestObjectType<string> {
    private mapFile;
    private mapObject;
    private factories;
    constructor(objectCurrent: MapObjectCurrentType, mapFile: MapFileType, mapObject: MapObjectType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(value: string): this;
    introduction(): "patron";
}

/**
 * Исправление реальных размеров объектов.
 * ТК сохраненные значения размеров объектов могут отличаться от
 * автоматически рассчитанных при рендеринге
 */
declare class ObjectGeometryFix implements GuestObjectType<MapObjectDocument[]> {
    private mapFile;
    private map;
    private factories;
    private readonly innerReceive;
    constructor(objectsVisible: MapObjectsType, mapFile: MapFileType, map: MapType, factories: {
        guest: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
    });
    give(value: MapObjectDocument[]): this;
}

declare interface ObjectPositionType {
    position(object: MapObjectDocument, point: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType<PointDocument>;
}

declare type ObjectsConfig = {
    axis: 'x' | 'y';
    direction: 'positive' | 'negative';
};

declare class ObjectsMatchedToQuery {
    private map;
    private factories;
    constructor(map: MapType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    objects<R extends GuestObjectType<MapObjectDocument[]>>(querySource: GuestAwareType<string>, guest: R): R;
}

declare class ObjectsOutsideScreen {
    private map;
    private stageSize;
    private layer;
    private factories;
    constructor(map: MapType, stageSize: GuestAwareType<SizeDocument>, layer: LayerBase, factories: {
        chain: FactoryType<ChainType<unknown>>;
        guestCast: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    count<R extends GuestObjectType<CountDocument>>(config: ObjectsConfig, guest: R): R;
}

declare class ParentTypes {
    private parentNames;
    private mapFile;
    private factories;
    constructor(parentNames: MapObjectParentNamesType, mapFile: MapFileType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guestCast: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    types<R extends GuestObjectType<MapTypeDocument[]>>(guest: R): R;
}

export declare const PatronSchemeEditor: any;

/**
 * Данные для точки с координатами
 */
declare type PointDocument = {
    x: number;
    y: number;
};

/**
 * Данные для точки с координатами и id
 */
declare interface PointIdDocument {
    id: string;
    x: number;
    y: number;
}

declare type RelationInformation = {
    index: number;
    object: MapObjectDocument;
};

/**
 * Обработка изменения размера редактора
 */
declare class Resizing implements GuestObjectType<MapDocument> {
    private canvas;
    private konvaLayer;
    private factories;
    constructor(mapFile: MapFileType, canvas: BrowserCanvas, konvaLayer: LayerBase, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(): this;
}

/**
 * Данные для элемента с размерами
 */
declare interface SizeDocument {
    width: number;
    height: number;
}

declare interface SizeDocument_2 {
    width: number;
    height: number;
}

declare class StageDefaultSize implements GuestAwareType<SizeDocument> {
    value<R extends GuestObjectType<SizeDocument>>(guest: R): R;
}

declare interface StageMoveRestrictionType {
    position(pos: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType;
}

declare interface StageMoveType {
    move(point: MapObjectDocument): void;
}

declare class StagePosition implements GuestObjectType<MapObjectDocument> {
    private stageMove;
    constructor(stageMove: StageMoveType);
    give(value: MapObjectDocument): this;
}

declare class StagePositionByObjectId {
    private stageMove;
    private factories;
    constructor(stageMove: StageMoveType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    move(map: GuestAwareType<MapDocument>, objectId: string): this;
}

declare interface StagePositionType {
    position(guest: GuestObjectType<PointDocument>): GuestObjectType;
}

export declare class StorageRecord<T> implements SourceType<T> {
    private name;
    private source;
    constructor(name: string);
    give(value: T | null): this;
    pool(): PatronPool<T>;
    value(guest: GuestType<T>): this;
}

/**
 * Объект для обработки разметки svg
 */
declare class SvgImage implements SvgImageType {
    private svgContent;
    private width;
    private height;
    constructor(svgContent: string, width?: number, height?: number);
    markup(): string;
}

/**
 * Поведение для обработки разметки svg
 */
declare interface SvgImageType {
    markup(): string;
}

/**
 * Объект для обработки изображения типа карты
 */
declare class SvgMapTypeImage implements SvgImageType {
    private type;
    private factories;
    constructor(type: MapTypeDocument, factories: {
        svgImage: FactoryType<SvgImageType>;
    });
    markup(): string;
}

declare class SystemFileFromHandler implements SystemFileType {
    private fileHandler;
    constructor(fileHandler: FileSystemFileHandle);
    content(target: GuestObjectType<string>): this;
}

declare interface SystemFileType {
    content(target: GuestObjectType<string>): this;
}

declare class TextNlAsBr implements TextType {
    private baseText;
    private factories;
    constructor(baseText: TextType, factories: {
        guestInTheMiddle: Factory<GuestObjectType>;
    });
    asString(guest: GuestObjectType<string>): GuestObjectType;
}

declare class TextNoHtml {
    private text;
    private factories;
    constructor(text: GuestAwareType<string>, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    noHtml(guest: GuestObjectType<string>): GuestObjectType<string>;
}

declare class TextOf implements TextType {
    private text;
    constructor(text: string);
    asString(guest: GuestObjectType<string>): GuestObjectType;
}

declare interface TextType {
    asString(guest: GuestObjectType<string>): GuestObjectType;
}

declare class TextWithoutHTML implements TextType {
    private baseText;
    private factories;
    constructor(baseText: TextType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    asString(guest: GuestObjectType<string>): GuestObjectType;
}

declare interface Transformed<To = unknown> {
    result(): To;
}

declare class TransformedFromJSON<To> implements Transformed<To> {
    private content;
    constructor(content: string);
    result(): To;
}

declare class TransformedToJSON<From> implements Transformed<string> {
    private content;
    constructor(content: From);
    result(): string;
}

export declare class UrlContent implements MapFileContentType {
    private notification;
    private factories;
    private contentCache;
    constructor(notification: NotificationType, factories: {
        sourceEmpty: FactoryType<SourceType>;
        guest: FactoryType<GuestObjectType>;
        patronOnce: FactoryType<GuestObjectType>;
    });
    canBeUsed(guest: GuestObjectType<boolean>): GuestObjectType<boolean> | this;
    content(target: GuestObjectType<string>): this;
    give(): this;
}

export declare const useApplication: () => {
    mapCurrentID: MapCurrentID;
    mapFile: MapFile;
    mapCurrent: MapCurrent;
    mapCurrentSource: GuestAware<MapDocument>;
    mapRemoved: MapRemoved;
    mapSettings: MapSettings;
    mapObject: MapObject;
    mapObjectRemoved: MapObjectRemoved;
    mapType: MapTypes;
    mapTypeRemoved: MapTypeRemoved;
    mapTypeNew: MapTypeNew;
    mapObjectsVisible: MapObjectsVisible;
    mapObjectCurrent: MapObjectCurrent;
    mapObjectNew: MapObjectNew;
    mapObjectsLink: MapObjectsLink;
    mapTypeCurrent: MapTypeCurrent;
    mapRects: MapObjectsRects;
    mapBackground: MapObjectBackground;
    mapObjectArrows: MapObjectsArrows;
    mapObjectsGeometryFix: ObjectGeometryFix;
    canvas: BrowserCanvas;
    miniMap: MiniMap;
    notification: Notification_2;
    modal: Modal;
    drawer: Drawer;
    konvaLayer: KonvaLayer_2;
    resizing: Resizing;
    objectAdditionalFieldsFix: ObjectAdditionalFieldsFix;
    mapObjectRelationRemoved: MapObjectRelationRemoved;
    fps: Fps;
    breadcrumbs: Breadcrumbs;
    mapObjectUrl: MapObjectUrl;
    keyboard: Keyboard;
    parentNames: MapObjectParentNames;
    parentTypes: ParentTypes;
    controlCombo: ControlCombo;
    menu: Menu;
    stagePosition: StagePosition;
    stagePositionByObjectId: StagePositionByObjectId;
    objectsMatchedToQuery: ObjectsMatchedToQuery;
    stageSize: StageDefaultSize;
    mapHistory: MapHistory;
    fileContent: SourceEmpty<any>;
    newArrow: NewArrow;
    objectsOutsideScreen: ObjectsOutsideScreen;
    settings: Source<EditorSettings>;
    documentTitle: DocumentTitle;
    sidebarDraggable: SourceEmpty<HTMLElement>;
    device: Device;
};

export declare const useFactories: () => {
    fileHandlerContent: Factory<SystemFileFromHandler>;
    browserFileSaved: Factory<BrowserFileSaved>;
    transformToString: Factory<TransformedToJSON<any>>;
    transformToObject: Factory<TransformedFromJSON<any>>;
    svgImage: Factory<SvgImage>;
    svgMapTypeImage: Factory<SvgMapTypeImage>;
    numberChunks: Factory<NumberChunks>;
    mapNameFromUrl: Factory<MapNameFromUrl>;
    textNoHtml: Factory<TextNoHtml>;
    jsonp: Factory<JSONP>;
    textOf: Factory<TextOf>;
    textNlAsBr: Factory<TextNlAsBr>;
    textWithoutHTML: Factory<TextWithoutHTML>;
    cache: Factory<Source<any>>;
    chain: Factory<GuestChain<any>>;
    guest: Factory<Guest<any>>;
    guestCast: Factory<GuestCast<any>>;
    guestAware: FactoryType<GuestAwareType<any>>;
    guestInTheMiddle: Factory<GuestCast<any>>;
    guestSync: Factory<GuestSync<any>>;
    patron: Factory<Patron<any>>;
    patronOnce: Factory<PatronOnce<any>>;
    pool: Factory<PatronPool<any>>;
    source: Factory<Source<any>>;
    sourceEmpty: Factory<SourceEmpty<any>>;
};

export declare class VueRefPatron<T> implements GuestObjectType<T> {
    private readonly innerRef;
    constructor(defaultValue?: T | undefined);
    get value(): T;
    ref<CT = undefined>(): Ref<CT extends undefined ? T : CT>;
    give(value: T): this;
    introduction(): "patron";
}

export { }
