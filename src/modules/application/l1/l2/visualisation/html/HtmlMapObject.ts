import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export class HtmlMapObject {
  public constructor(
    private object: MapObjectDocument,
  ) {
  }

  public html() {
    return 'template';
  }
}
