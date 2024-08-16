import { MapSettingsStructure } from '@/modules/entities/MapStructures';

export interface MapSettings {
  content(): MapSettingsStructure
  save(value: MapSettingsStructure): this;
}
