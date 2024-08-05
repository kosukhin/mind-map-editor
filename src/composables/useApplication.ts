import { CanvasNull } from '@/objects/canvas/CanvasNull';
import { MapNull } from '@/objects/map/MapNull';
import { MapFileNull } from '@/objects/mapFile/MapFileNull';
import { MapObjectNull } from '@/objects/mapObject/MapObjectNull';
import { MapSettingsNull } from '@/objects/mapSettings/MapSettingsNull';
import { MapTypeNull } from '@/objects/mapType/MapTypeNull';

export const useApplication = () => {
  const map = new MapNull();
  const mapObject = new MapObjectNull();
  const mapType = new MapTypeNull();
  const mapSettings = new MapSettingsNull();
  const mapFile = new MapFileNull();
  const canvas = new CanvasNull();

  return {
    map,
    mapObject,
    mapType,
    mapSettings,
    mapFile,
    canvas,
  };
};
