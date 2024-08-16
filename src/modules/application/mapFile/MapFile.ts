import { MapFileStructure, MapStructure } from "@/modules/entities/MapStructures";
import { Target } from "@/modules/system/target/Target";
import { TargetPool } from "@/modules/system/target/TargetPool";

export interface MapFile {
  currentMap(target: Target<MapStructure>): this;
  currentMapPool(target: Target<MapStructure>): this;

  mapFile(target: Target<MapFileStructure>): this;
  mapFilePool(target: Target<MapFileStructure>): this;
}
