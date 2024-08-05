import { MapObjectStructure, MapStructure } from '@/entities/MapStructures';
import { ListItem } from '@/modules/types/ListItem';

export const mapTransformer = {
  // Elements of map what can be displayed in menu
  menuItems(map: MapStructure) {
    return Object.values(map.objects)
      .filter((object) => object.inMenu)
      .sort((a, b) => a.menuOrder - b.menuOrder);
  },
  // List of map types usefully for dropdowns
  typesList(map: MapStructure): ListItem[] {
    return Object.entries(map.types).map(([typeId, mapType]) => ({
      id: typeId,
      name: mapType.name,
    }));
  },
  // Array of map's objects
  getObjects(map: MapStructure): MapObjectStructure[] {
    return Object.values(map.objects);
  },
};
