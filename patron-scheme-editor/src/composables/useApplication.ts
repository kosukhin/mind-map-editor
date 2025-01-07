import { DocumentTitle } from './../modules/integration/browser/document/DocumentTitle';
import { useFactories } from '@/composables/useFactories';
import { EditorSettings } from '@/modules/application/l1/l2/l3/l4/editor/EditorSettings';
import { CheckNotification } from '@/modules/application/l1/l2/l3/map/checks/CheckNotification';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapCurrentID } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentID';
import { MapCurrentTitle } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentTitle';
import { MapHistory } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapHistory';
import { MapRemoved } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapRemoved';
import { MapFile } from '@/modules/application/l1/l2/l3/map/mapFile/MapFile';
import { MapFileForRendering } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileForRendering';
import { MapObject } from '@/modules/application/l1/l2/l3/map/mapObject/MapObject';
import { MapObjectCurrent } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrent';
import { MapObjectHasArrowCheck } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectHasArrowCheck';
import { MapObjectNew } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectNew';
import { MapObjectParentNames } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectParentNames';
import { MapObjectRelationRemoved } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectRelationRemoved';
import { MapObjectRemoved } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectRemoved';
import { MapObjectsLink } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectsLink';
import { MapObjectUrl } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectUrl';
import { ObjectPositionBounds } from '@/modules/application/l1/l2/l3/map/mapObject/ObjectPositionBounds';
import { ObjectPositionGridStick } from '@/modules/application/l1/l2/l3/map/mapObject/ObjectPositionGridStick';
import { ObjectsOutsideScreen } from '@/modules/application/l1/l2/l3/map/mapObject/ObjectsOutsideScreen';
import { MapSettings } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettings';
import { MapTypeCurrent } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeCurrent';
import { MapTypeNew } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeNew';
import { MapTypeRemoved } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeRemoved';
import { MapTypes } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypes';
import { MapTypeUsed } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeUsed';
import { MapTypeUsedNameChangedCheck } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeUsedNameChangedCheck';
import { ParentTypes } from '@/modules/application/l1/l2/l3/map/mapTypes/ParentTypes';
import { ObjectsMatchedToQuery } from '@/modules/application/l1/l2/l3/search/ObjectsMatchedToQuery';
import { StageDefaultSize } from '@/modules/application/l1/l2/l3/stage/StageDefaultSize';
import { StageMoveRestriction } from '@/modules/application/l1/l2/l3/stage/StageMoveRestriction';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import { ObjectAdditionalFieldsFix } from '@/modules/application/l1/l2/structuring/objectAdditionalFieldsFix/ObjectAdditionalFieldsFix';
import { ArrowPath } from '@/modules/application/l1/l2/visualisation/arrows/ArrowPath';
import { MapObjectsArrows } from '@/modules/application/l1/l2/visualisation/arrows/MapObjectsArrows';
import { NewArrow } from '@/modules/application/l1/l2/visualisation/arrows/NewArrow';
import { MapObjectBackground } from '@/modules/application/l1/l2/visualisation/background/MapObjectBackground';
import { Breadcrumbs } from '@/modules/application/l1/l2/visualisation/breadcrumbs/Breadcrumbs';
import { CursorWithObjects } from '@/modules/application/l1/l2/visualisation/cursor/CursorWithObjects';
import { Device } from '@/modules/application/l1/l2/visualisation/device/Device';
import { Drawer } from '@/modules/application/l1/l2/visualisation/drawer/Drawer';
import { Fps } from '@/modules/application/l1/l2/visualisation/fps/Fps';
import { Menu } from '@/modules/application/l1/l2/visualisation/menu/Menu';
import { MiniMap } from '@/modules/application/l1/l2/visualisation/miniMap/MiniMap';
import { Modal } from '@/modules/application/l1/l2/visualisation/modal/Modal';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { ObjectGeometryFix } from '@/modules/application/l1/l2/visualisation/objectGeometryFix/ObjectGeometryFix';
import { MapObjectsRects } from '@/modules/application/l1/l2/visualisation/rects/MapObjectsRects';
import { Resizing } from '@/modules/application/l1/l2/visualisation/resizing/Resizing';
import { StagePosition } from '@/modules/application/l1/l2/visualisation/stage/StagePosition';
import { StagePositionByObjectId } from '@/modules/application/l1/l2/visualisation/stage/StagePositionByObjectId';
import { Window } from '@/modules/application/l1/l2/visualisation/window/Window';
import { Zindex } from '@/modules/application/l1/l2/visualisation/zIndex/Zindex';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Cursor } from '@/modules/integration/browser/cursor/Cursor';
import { Draggable } from '@/modules/integration/browser/dragged/Draggable';
import { ControlCombo } from '@/modules/integration/browser/keyboard/ControlCombo';
import { Keyboard } from '@/modules/integration/browser/keyboard/Keyboard';
import { SessionRecord } from '@/modules/integration/browser/storage/SessionRecord';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { KonvaLayerShiftPoint } from '@/modules/integration/konva/KonvaLayerShiftPoint';
import { KonvaMove } from '@/modules/integration/konva/KonvaMove';
import { give, GuestAware, GuestCast, GuestObject, GuestType, Source, SourceEmpty, Patron } from 'patron-oop';

const factories = useFactories();

const keyboard = new Keyboard(factories);
const settings = new Source<EditorSettings>({
  readonly: false,
  presets: {},
});

const modal = new Modal(keyboard, factories);
const drawer = new Drawer(keyboard, factories);
const notification = new Notification(factories);
const mapCurrentID = new MapCurrentID(factories);

const fileContent = factories.sourceEmpty.create();
const mapFile = new MapFile(fileContent, mapCurrentID, factories);
const mapCurrentTitle = new MapCurrentTitle(mapFile);
const documentTitle = new DocumentTitle(mapCurrentTitle);

const sessionMap = new SessionRecord('current-map');
mapFile.currentMap(new Patron(sessionMap));

const mapFileForRendering = new MapFileForRendering(mapFile, mapCurrentID, factories);
const mapForRendering = new MapCurrent(mapFileForRendering, mapCurrentID, factories);
const mapObjectForRendering = new MapObject(mapForRendering, mapFileForRendering, factories);

const mapCurrent = new MapCurrent(mapFile, mapCurrentID, factories);
const mapCurrentSource = new GuestAware<MapDocument>((guest) => {
  mapFile.currentMap(new GuestObject(guest));
});
const mapObjectCurrent = new MapObjectCurrent(drawer, factories);
const mapTypeCurrent = new MapTypeCurrent(factories);
const mapSettings = new MapSettings(mapFile, mapCurrent, factories);
const canvas = new BrowserCanvas(factories);
const stageSize = new StageDefaultSize();
const stageMoveRestriction = new StageMoveRestriction(canvas, stageSize, factories);
const konvaLayer = new KonvaLayer(canvas, stageSize, stageMoveRestriction, factories);
const zIndex = new Zindex(factories);
const mapBackground = new MapObjectBackground(konvaLayer, mapFile, zIndex, factories);
const mapObject = new MapObject(mapCurrent, mapFile, factories);
const mapObjectRemoved = new MapObjectRemoved(
  mapCurrent,
  mapFile,
  [new CheckNotification(notification, new MapObjectHasArrowCheck(mapFile, factories), factories)],
  factories,
);
const konvaLayerPosition = new KonvaLayerShiftPoint(konvaLayer, factories);
const mapObjectNew = new MapObjectNew(mapCurrent, mapObject, canvas, konvaLayerPosition, factories);
const mapTypeUsedCheck = new MapTypeUsed(mapFile, factories);
const mapType = new MapTypes(
  mapCurrent,
  mapFile,
  [
    new CheckNotification(
      notification,
      new MapTypeUsedNameChangedCheck(mapTypeUsedCheck, factories),
      factories,
    ),
  ],
  factories,
);
const mapTypeRemoved = new MapTypeRemoved(
  mapCurrent,
  mapFile,
  [new CheckNotification(notification, mapTypeUsedCheck, factories)],
  factories,
);
const mapTypeNew = new MapTypeNew(mapType);
const mapObjectsVisible = new MapObjectsVisible(konvaLayer, canvas, mapFileForRendering, factories);
const mapObjectsGeometryFix = new ObjectGeometryFix(
  mapObjectsVisible,
  mapFile,
  mapCurrent,
  factories,
);
const mapRects = new MapObjectsRects(
  konvaLayer,
  mapFile,
  mapObject,
  mapObjectsVisible,
  mapObjectCurrent,
  mapObjectForRendering,
  new ObjectPositionGridStick(new ObjectPositionBounds(stageSize, factories), factories),
  settings,
  factories,
);
const cursor = new Cursor(konvaLayer, factories);
const cursorWithObjects = new CursorWithObjects(mapObjectsVisible, cursor, factories);
const arrowPath = new ArrowPath();
const newArrow = new NewArrow(konvaLayer, cursorWithObjects, arrowPath, factories);
const mapArrows = new MapObjectsArrows(konvaLayer, mapFile, mapForRendering, arrowPath, factories);
const miniMap = new MiniMap(mapForRendering, konvaLayer, stageSize, factories);
const mapObjectsLink = new MapObjectsLink(
  mapObjectCurrent,
  mapCurrent,
  mapObject,
  newArrow,
  factories,
);
const resizing = new Resizing(mapFile, canvas, konvaLayer, factories);
const objectAdditionalFieldsFix = new ObjectAdditionalFieldsFix(
  mapObjectCurrent,
  mapFile,
  mapObject,
  factories,
);
const mapRemoved = new MapRemoved(mapFile, mapCurrentID, factories);
const mapObjectRelationRemoved = new MapObjectRelationRemoved(mapObject);
const fps = new Fps();
const parentNames = new MapObjectParentNames(mapCurrentID, factories);
const breadcrumbs = new Breadcrumbs(parentNames, mapFile, factories);
const mapObjectUrl = new MapObjectUrl(mapCurrentID, factories);
const parentTypes = new ParentTypes(parentNames, mapFile, factories);
const controlCombo = new ControlCombo(keyboard, factories);
const menu = new Menu(mapFile, factories);
const konvaMove = new KonvaMove(konvaLayer, canvas, stageSize, stageMoveRestriction, factories);
const stagePosition = new StagePosition(konvaMove);
const stagePositionByObjectId = new StagePositionByObjectId(konvaMove, factories);
const objectsMatchedToQuery = new ObjectsMatchedToQuery(mapCurrent, factories);
const mapHistory = new MapHistory(mapFile, mapCurrent, mapCurrentID, factories);
const objectsOutsideScreen = new ObjectsOutsideScreen(mapCurrent, stageSize, konvaLayer, factories);
const sidebarDraggable = new SourceEmpty<HTMLElement>();
new Draggable(sidebarDraggable);

const theWindow = new Window();
const windowWidth = new GuestAware<number>((guest) => {
  theWindow.value(
    new GuestCast(guest, (windowDoc) => {
      give(windowDoc.width, guest);
    })
  )
});
const device = new Device(windowWidth);

const modules = {
  mapCurrentID,
  mapFile,
  mapCurrent,
  mapCurrentSource,
  mapRemoved,
  mapSettings,
  mapObject,
  mapObjectRemoved,
  mapType,
  mapTypeRemoved,
  mapTypeNew,
  mapObjectsVisible,
  mapObjectCurrent,
  mapObjectNew,
  mapObjectsLink,
  mapTypeCurrent,
  mapRects,
  mapBackground,
  mapObjectArrows: mapArrows,
  mapObjectsGeometryFix,
  canvas,
  miniMap,
  notification,
  modal,
  drawer,
  konvaLayer,
  resizing,
  objectAdditionalFieldsFix,
  mapObjectRelationRemoved,
  fps,
  breadcrumbs,
  mapObjectUrl,
  keyboard,
  parentNames,
  parentTypes,
  controlCombo,
  menu,
  stagePosition,
  stagePositionByObjectId,
  objectsMatchedToQuery,
  stageSize,
  mapHistory,
  fileContent,
  newArrow,
  objectsOutsideScreen,
  settings,
  documentTitle,
  sidebarDraggable,
  device,
};

export const useApplication = () => modules;
