import { MapFile } from '@/modules/application/l1/l2/l3/map/mapFile/MapFile';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapSettings } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettings';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import { MapObjectsRects } from '@/modules/application/l1/l2/visualisation/rects/MapObjectsRects';
import { MapObject } from '@/modules/application/l1/l2/l3/map/mapObject/MapObject';
import { MiniMap } from '@/modules/application/l1/l2/visualisation/miniMap/MiniMap';
import { useFactories } from '@/composables/useFactories';
import { MapObjectsArrows } from '@/modules/application/l1/l2/visualisation/arrows/MapObjectsArrows';
import { MapTypes } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypes';
import { MapObjectCurrent } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrent';
import { MapTypeCurrent } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeCurrent';
import { MapObjectNew } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectNew';
import { MapObjectsLink } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectsLink';
import { MapFileForRendering } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileForRendering';
import { Modal } from '@/modules/application/l1/l2/visualisation/modal/Modal';
import { Drawer } from '@/modules/application/l1/l2/visualisation/drawer/Drawer';
import { MapTypeRemoved } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeRemoved';
import { MapTypeNew } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeNew';
import { MapTypeUsed } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeUsed';
import { MapObjectRemoved } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectRemoved';
import { CheckNotification } from '@/modules/application/l1/l2/l3/map/checks/CheckNotification';
import {
  MapTypeUsedNameChangedCheck,
} from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeUsedNameChangedCheck';
import {
  MapObjectHasArrowCheck,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectHasArrowCheck';
import {
  MapObjectBackground,
} from '@/modules/application/l1/l2/visualisation/background/MapObjectBackground';
import { Zindex } from '@/modules/application/l1/l2/visualisation/zIndex/Zindex';
import { Resizing } from '@/modules/application/l1/l2/visualisation/resizing/Resizing';
import {
  ObjectGeometryFix,
} from '@/modules/application/l1/l2/visualisation/objectGeometryFix/ObjectGeometryFix';
import {
  ObjectAdditionalFieldsFix,
} from '@/modules/application/l1/l2/structuring/objectAdditionalFieldsFix/ObjectAdditionalFieldsFix';
import { MapRemoved } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapRemoved';
import {
  MapObjectRelationRemoved,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectRelationRemoved';
import { Fps } from '@/modules/application/l1/l2/visualisation/fps/Fps';
import { MapCurrentID } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentID';
import { Breadcrumbs } from '@/modules/application/l1/l2/visualisation/breadcrumbs/Breadcrumbs';
import {
  MapObjectParentNames,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectParentNames';
import { MapObjectUrl } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectUrl';
import { Keyboard } from '@/modules/integration/browser/keyboard/Keyboard';
import { ParentTypes } from '@/modules/application/l1/l2/l3/map/mapTypes/ParentTypes';
import { ControlCombo } from '@/modules/integration/browser/keyboard/ControlCombo';
import { Menu } from '@/modules/application/l1/l2/visualisation/menu/Menu';
import { StagePosition } from '@/modules/application/l1/l2/visualisation/stage/StagePosition';
import { KonvaMove } from '@/modules/integration/konva/KonvaMove';
import { KonvaLayerShiftPoint } from '@/modules/integration/konva/KonvaLayerShiftPoint';
import { ObjectsMatchedToQuery } from '@/modules/application/l1/l2/l3/search/ObjectsMatchedToQuery';
import {
  ObjectPositionBounds,
} from '@/modules/application/l1/l2/l3/map/mapObject/ObjectPositionBounds';
import {
  ObjectPositionGridStick,
} from '@/modules/application/l1/l2/l3/map/mapObject/ObjectPositionGridStick';
import { StageDefaultSize } from '@/modules/application/l1/l2/l3/stage/StageDefaultSize';
import { StageMoveRestriction } from '@/modules/application/l1/l2/l3/stage/StageMoveRestriction';
import { MapHistory } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapHistory';
import {
  FirstPossibleFileContent,
} from '@/modules/application/l1/l2/l3/map/mapFile/FirstPossibleFileContent';
import { UrlContent } from '@/modules/application/l1/url/UrlContent';
import { ArrowPath } from '@/modules/application/l1/l2/visualisation/arrows/ArrowPath';
import { Cursor } from '@/modules/integration/browser/cursor/Cursor';
import { NewArrow } from '@/modules/application/l1/l2/visualisation/arrows/NewArrow';
import {
  CursorWithObjects,
} from '@/modules/application/l1/l2/visualisation/cursor/CursorWithObjects';

const factories = useFactories();

const keyboard = new Keyboard(factories);

const modal = new Modal(keyboard, factories);
const drawer = new Drawer(keyboard, factories);
const notification = new Notification(factories);

const mapCurrentID = new MapCurrentID(factories);

const fileContent = new FirstPossibleFileContent([
  new UrlContent(notification, factories),
  new FileSystemContent(
    new BrowserLaunchQueue(),
    notification,
    factories,
  ),
], factories);
const mapFile = new MapFile(
  fileContent,
  mapCurrentID,
  factories,
);

const mapFileForRendering = new MapFileForRendering(mapFile, mapCurrentID, factories);
const mapForRendering = new MapCurrent(mapFileForRendering, mapCurrentID, factories);
const mapObjectForRendering = new MapObject(mapForRendering, mapFileForRendering, factories);

const mapCurrent = new MapCurrent(mapFile, mapCurrentID, factories);
const mapObjectCurrent = new MapObjectCurrent(drawer, factories);
const mapTypeCurrent = new MapTypeCurrent(factories);
const mapSettings = new MapSettings(mapFile, mapCurrent, factories);
const canvas = new BrowserCanvas(factories);
const stageSize = new StageDefaultSize();
const stageMoveRestriction = new StageMoveRestriction(canvas, stageSize, factories);
const konvaLayer = new KonvaLayer(
  canvas,
  stageSize,
  stageMoveRestriction,
  factories,
);
const zIndex = new Zindex(factories);
const mapBackground = new MapObjectBackground(konvaLayer, mapFile, zIndex, factories);
const mapObject = new MapObject(mapCurrent, mapFile, factories);
const mapObjectRemoved = new MapObjectRemoved(
  mapCurrent,
  mapFile,
  [
    new CheckNotification(
      notification,
      new MapObjectHasArrowCheck(mapFile, factories),
      factories,
    ),
  ],
  factories,
);
const konvaLayerPosition = new KonvaLayerShiftPoint(konvaLayer, factories);
const mapObjectNew = new MapObjectNew(
  mapCurrent,
  mapObject,
  canvas,
  konvaLayerPosition,
  factories,
);
const mapTypeUsedCheck = new MapTypeUsed(mapFile, factories);
const mapType = new MapTypes(
  mapCurrent,
  mapFile,
  [new CheckNotification(
    notification,
    new MapTypeUsedNameChangedCheck(
      mapTypeUsedCheck,
      factories,
    ),
    factories,
  )],
  factories,
);
const mapTypeRemoved = new MapTypeRemoved(
  mapCurrent,
  mapFile,
  [new CheckNotification(notification, mapTypeUsedCheck, factories)],
  factories,
);
const mapTypeNew = new MapTypeNew(mapType);
const mapObjectsVisible = new MapObjectsVisible(
  konvaLayer,
  canvas,
  mapFileForRendering,
  factories,
);
const mapObjectsGeometryFix = new ObjectGeometryFix(mapObjectsVisible, mapFile, mapCurrent, factories);
const mapRects = new MapObjectsRects(
  konvaLayer,
  mapFile,
  mapObject,
  mapObjectsVisible,
  mapObjectCurrent,
  mapObjectForRendering,
  new ObjectPositionGridStick(
    new ObjectPositionBounds(
      stageSize,
      factories,
    ),
    factories,
  ),
  factories,
);
const cursor = new Cursor(konvaLayer, factories);
const cursorWithObjects = new CursorWithObjects(
  mapObjectsVisible,
  cursor,
  factories,
);
const arrowPath = new ArrowPath();
const newArrow = new NewArrow(konvaLayer, cursorWithObjects, arrowPath, factories);
const mapArrows = new MapObjectsArrows(
  konvaLayer,
  mapFile,
  mapForRendering,
  arrowPath,
  factories,
);
const miniMap = new MiniMap(mapForRendering, konvaLayer, stageSize, factories);
const mapObjectsLink = new MapObjectsLink(
  mapObjectCurrent,
  mapCurrent,
  mapObject,
  newArrow,
  factories,
);
const resizing = new Resizing(mapFile, canvas, konvaLayer, factories);
const objectAdditionalFieldsFix = new ObjectAdditionalFieldsFix(mapObjectCurrent, mapFile, mapObject, factories);
const mapRemoved = new MapRemoved(mapFile, mapCurrentID, factories);
const mapObjectRelationRemoved = new MapObjectRelationRemoved(mapObject);
const fps = new Fps();
const parentNames = new MapObjectParentNames(mapCurrentID, factories);
const breadcrumbs = new Breadcrumbs(parentNames, mapFile, factories);
const mapObjectUrl = new MapObjectUrl(mapCurrentID, factories);
const parentTypes = new ParentTypes(parentNames, mapFile, factories);
const controlCombo = new ControlCombo(keyboard, factories);
const menu = new Menu(mapFile, factories);
const stagePosition = new StagePosition(new KonvaMove(
  konvaLayer,
  canvas,
  stageSize,
  stageMoveRestriction,
  factories,
));
const objectsMatchedToQuery = new ObjectsMatchedToQuery(
  mapCurrent,
  factories,
);
const mapHistory = new MapHistory(mapFile, mapCurrent, mapCurrentID, factories);

const modules = {
  mapCurrentID,
  mapFile,
  mapCurrent,
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
  objectsMatchedToQuery,
  stageSize,
  mapHistory,
  fileContent,
  newArrow,
};

export const useApplication = () => modules;
