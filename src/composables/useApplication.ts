import { CanvasNull } from '@/objects/application/canvas/CanvasNull';
import { MapNull } from '@/objects/application/map/MapNull';
import { MapFileNull } from '@/objects/application/mapFile/MapFileNull';
import { MapObjectNull } from '@/objects/application/mapObject/MapObjectNull';
import { MapSettingsNull } from '@/objects/application/mapSettings/MapSettingsNull';
import { MapTypeNull } from '@/objects/application/mapType/MapTypeNull';
import { CanvasWhenClickElement } from '@/objects/application/canvas/CanvasWhenClickElement';
import { CanvasFromMap } from '@/objects/application/canvas/CanvasFromMap';
import { MapFileFromURL } from '@/objects/application/mapFile/MapFileFromURL';
import { MapFileFromFS } from '@/objects/application/mapFile/MapFileFromFS';

export const useApplication = () => {
  const map = new MapNull();
  const mapObject = new MapObjectNull();
  const mapType = new MapTypeNull();
  const mapSettings = new MapSettingsNull();
  const mapFile = new MapFileFromURL(new MapFileFromFS(new MapFileNull()));
  const canvas = new CanvasWhenClickElement(
    new CanvasFromMap(new CanvasNull(), map),
  );

  return {
    map,
    mapObject,
    mapType,
    mapSettings,
    mapFile,
    canvas,
  };
};
