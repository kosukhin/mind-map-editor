import { HtmlTemplate } from '@/modules/html/HtmlTemplate';
import {
  Guest,
  GuestAware,
  GuestAwareType,
  GuestCast,
  GuestObject,
  GuestObjectType,
  Patron,
  SourceType,
} from 'patron-oop';

export interface ShareFileDocument {
  name: string,
  content: string,
  mime: string,
}

export class ShareContent {
  private contentSource: GuestAwareType<string>;

  public constructor(
    private sharedSource: SourceType<ShareFileDocument>,
    private sharedFromWorker: GuestAwareType<ShareFileDocument>,
    private htmlTemplate: HtmlTemplate,
  ) {
    this.sharedFromWorker.value(new Patron((valueFromWorker) => {
      this.sharedSource.value((cachedValue) => {
        if (!cachedValue) {
          this.sharedSource.give(valueFromWorker);
        }
      });
    }));
    this.contentSource = new GuestAware((guest) => {
      const guestObject = new GuestObject(guest);
      this.sharedSource.value(new GuestCast(guestObject, (v) => {
        if (v) {
          if (v.name.includes('.html')) {
            this.htmlTemplate.htmlToJson(v.content, new GuestCast(guestObject, (json) => {
              guestObject.give(json);
            }));
          } else {
            guestObject.give(v.content);
          }
        }
      }));
    });
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    this.sharedFromWorker.value(new GuestCast(guest, (v) => {
      guest.give(!!v);
    }));

    this.sharedSource.value(new GuestCast(guest, (v) => {
      guest.give(!!v);
    }));

    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    this.contentSource.value(target);
    return this;
  }

  public give(content: string): this {
    const isEmptyMap = content.includes('"objects":{},"types":{},');
    console.trace('!!!GIVED CONTENT', content);

    this.sharedSource.value((value) => {
      const correnctContent = isEmptyMap ? value.content : content;

      if (value.mime.includes('html')) {
        if (isEmptyMap) {
          this.sharedSource.give({
            ...value,
            content: correnctContent,
          });
        } else {
          this.htmlTemplate.jsonToHtml(correnctContent, new Guest((htmlContent: string) => {
            this.sharedSource.give({
              ...value,
              content: htmlContent,
            });
          }));
        }
      } else {
        this.sharedSource.give({
          ...value,
          content: correnctContent,
        });
      }
    });
    return this;
  }
}
