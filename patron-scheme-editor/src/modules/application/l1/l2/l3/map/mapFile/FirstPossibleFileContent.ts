import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import { debug } from 'debug';
import { FactoryType, GuestObjectType, SourceEmpty } from 'patron-oop';

const localDebug = debug('FirstPossibleFileContent');

export class FirstPossibleFileContent implements MapFileContentType {
  private firstPossibleFileContent: MapFileContentType | null = null;
  private contentSource = new SourceEmpty();
  private canBeUsedSource = new SourceEmpty();

  public constructor(
    fileContents: MapFileContentType[],
    factories: {
      guest: FactoryType<GuestObjectType>;
      patronOnce: FactoryType<GuestObjectType>;
      patron: FactoryType<GuestObjectType>;
    },
  ) {
    localDebug('length', fileContents.length);
    fileContents.forEach((fileContent) => {
      fileContent.canBeUsed(
        factories.patronOnce.create(
          factories.guest.create((canBeUsed: boolean) => {
            localDebug('canbeused result', fileContent, canBeUsed);
            if (canBeUsed && !this.firstPossibleFileContent) {
              this.firstPossibleFileContent = fileContent;
              fileContent.canBeUsed(factories.patron.create(this.canBeUsedSource));
              fileContent.content(factories.patron.create(this.contentSource));
              this.contentSource.value(
                factories.patron.create((lastContent: string) => {
                  fileContent.content(
                    factories.guest.create((lastFileContent: string) => {
                      if (lastContent !== lastFileContent) {
                        fileContent.give(lastContent);
                      }
                    }),
                  );
                }),
              );
            }
          }),
        ),
      );
    });
  }

  public canBeUsed<R extends GuestObjectType<boolean>>(guest: R) {
    localDebug('can be used to', this.firstPossibleFileContent);
    this.canBeUsedSource.value(guest);
    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    localDebug('content to', this.firstPossibleFileContent);
    this.contentSource.value(target);
    return this;
  }

  public give(value: string): this {
    this.contentSource.give(value);
    return this;
  }
}
