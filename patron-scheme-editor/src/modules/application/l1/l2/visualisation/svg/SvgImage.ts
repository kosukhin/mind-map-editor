import { SvgImageType } from '@/modules/application/l1/l2/visualisation/svg/SvgImageType';

/**
 * Объект для обработки разметки svg
 */
export class SvgImage implements SvgImageType {
  public constructor(
    private svgContent: string,
    private width = 100,
    private height = 100,
  ) {}

  public markup(): string {
    return this.svgContent

      .replaceAll('${width}', String(this.width))

      .replaceAll('${height}', String(this.height));
  }
}
