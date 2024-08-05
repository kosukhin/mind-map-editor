import { MapFileStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { MapFile } from '@/objects/mapFile/MapFile';

export class MapFileOf implements MapFile {
  channel(): BaseChannel<MapFileStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): MapFileStructure {
    throw new Error('Method not implemented.');
  }
}
