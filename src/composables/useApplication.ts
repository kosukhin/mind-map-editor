import { CanvasNull } from '@/objects/canvas/CanvasNull';
import { MapNull } from '@/objects/map/MapNull';
import { MapFileNull } from '@/objects/mapFile/MapFileNull';
import { MapObjectNull } from '@/objects/mapObject/MapObjectNull';
import { MapSettingsNull } from '@/objects/mapSettings/MapSettingsNull';
import { MapTypeNull } from '@/objects/mapType/MapTypeNull';
import { CanvasWhenClickElement } from '@/objects/canvas/CanvasWhenClickElement';
import { CanvasFromMap } from '@/objects/canvas/CanvasFromMap';
import { MapFileFromURL } from '@/objects/mapFile/MapFileFromURL';
import { MapFileFromFS } from '@/objects/mapFile/MapFileFromFS';

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
