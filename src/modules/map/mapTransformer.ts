import { MapStructure } from '@/entities/Map';

export const mapTransformer = {
  menuItems(map: MapStructure) {
    return Object.values(map.objects)
      .filter((object) => object.inMenu)
      .sort((a, b) => a.menuOrder - b.menuOrder);
  },
};
