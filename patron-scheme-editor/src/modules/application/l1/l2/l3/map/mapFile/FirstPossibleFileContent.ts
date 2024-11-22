import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { debug } from 'debug';

const localDebug = debug('FirstPossibleFileContent');

export class FirstPossibleFileContent implements MapFileContentType {
  private firstPossibleFileContent: MapFileContentType | null = null;

  public constructor(
    fileContents: MapFileContentType[],
    factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {
    localDebug('length', fileContents.length);
    fileContents.forEach((fileContent) => {
      fileContent.canBeUsed(
        factories.guest.create((canBeUsed: boolean) => {
          localDebug('canbeused result', fileContent, canBeUsed);
          if (canBeUsed && !this.firstPossibleFileContent) {
            this.firstPossibleFileContent = fileContent;
          }
        }),
      );
    });
  }

  public canBeUsed<R extends GuestObjectType<boolean>>(guest: R) {
    localDebug('can be used to', this.firstPossibleFileContent);
    if (this.firstPossibleFileContent) {
      this.firstPossibleFileContent.canBeUsed(guest);
    }
    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    localDebug('content to', this.firstPossibleFileContent);
    if (this.firstPossibleFileContent) {
      this.firstPossibleFileContent.content(target);
    }
    return this;
  }

  public give(value: string): this {
    if (this.firstPossibleFileContent) {
      this.firstPossibleFileContent.give(value);
    }
    return this;
  }
}
