import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { debug } from 'debug';

const localDebug = debug('FirstPossibleFileContent');

export class FirstPossibleFileContent implements MapFileContentType {
  private firstPossibleFileContent: MapFileContentType | null = null;

  public constructor(
    fileContents: MapFileContentType[],
    factories: {
      guest: FactoryType<GuestType>,
    },
  ) {
    fileContents.forEach((fileContent) => {
      fileContent.canBeUsed(
        factories.guest.create((canBeUsed: boolean) => {
          if (canBeUsed && !this.firstPossibleFileContent) {
            this.firstPossibleFileContent = fileContent;
          }
        }),
      );
    });
  }

  canBeUsed(guest: GuestType<boolean>): this {
    localDebug('can be used to', this.firstPossibleFileContent);
    if (this.firstPossibleFileContent) {
      this.firstPossibleFileContent.canBeUsed(guest);
    }
    return this;
  }

  content(target: GuestType<string>): this {
    localDebug('content to', this.firstPossibleFileContent);
    if (this.firstPossibleFileContent) {
      this.firstPossibleFileContent.content(target);
    }
    return this;
  }

  receive(value: string): this {
    if (this.firstPossibleFileContent) {
      this.firstPossibleFileContent.receive(value);
    }
    return this;
  }
}
