import { SvgImageType } from '@/modules/application/l1/l2/visualisation/svg/SvgImageType';

export class SvgImage implements SvgImageType {
  public constructor(
    private svgContent: string,
    private width = 100,
    private height = 100,
  ) {}

  public markup(): string {
    return this.svgContent
      // eslint-disable-next-line no-template-curly-in-string
      .replaceAll('${width}', String(this.width))
      // eslint-disable-next-line no-template-curly-in-string
      .replaceAll('${height}', String(this.height));
  }
}
