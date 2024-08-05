import { MapFileStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { MapFile } from '@/objects/mapFile/MapFile';

export class MapFileFromURL implements MapFile {
  entity(): BaseResult<MapFileStructure> {
    throw new Error('Method not implemented.');
  }
}
