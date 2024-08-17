import { Target } from '@/modules/system/target/Target';
import { MapSettingsDocument } from '@/modules/entities/MapStructures';

export interface Map {
  mapSettings(target: Target<MapSettingsDocument>): this;
}
