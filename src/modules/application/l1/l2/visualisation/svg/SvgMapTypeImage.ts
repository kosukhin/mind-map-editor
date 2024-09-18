import { SvgImageType } from '@/modules/application/l1/l2/visualisation/svg/SvgImageType';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { FactoryType } from '@/modules/system/guest/FactoryType';

/**
 * Объект для обработки изображения типа карты
 */
export class SvgMapTypeImage implements SvgImageType {
  public constructor(
    private type: MapTypeDocument,
    private factories: {
      svgImage: FactoryType<SvgImageType>
    },
  ) {}

  public markup(): string {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
