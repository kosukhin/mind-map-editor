import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';
import { slugify } from 'transliteration';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import debounce from 'lodash/debounce';
import { useRouter } from 'vue-router';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { debug } from 'debug';

const urlTrim = (url: string) => {
  if (url[url.length - 1] === '/') {
    const urlArr = url.split('');
    urlArr.splice(urlArr.length - 1, 1);
    return urlArr.join('');
  }
  return url;
};

// eslint-disable-next-line no-restricted-globals
const getLocation = () => location;

const openExternalLink = debounce((link: string) => {
  window.open(link);
}, 200);

const localDebug = debug('MapObjectUrl');

export class MapObjectUrl {
  public constructor(
    private object: GuestAwareType<MapObjectDocument>,
    private factories: {
      guest: FactoryType<GuestType>,
      guestInTheMiddle: FactoryType<GuestType>,
    },
  ) {}

  public open() {
    this.object.receiving(
      this.factories.guest.create((object: MapObjectDocument) => {
        this.url(
          this.factories.guest.create((url: string) => {
            if (object?.linked) {
              if (object.targetBlank) {
                openExternalLink(url);
              } else {
                localDebug('open new map', url);
              }
            }
          }),
        );
      }),
    );

    return this;
  }

  public url<R extends GuestType<string>>(guest: R) {
    this.object.receiving(
      this.factories.guestInTheMiddle.create(guest, (object: MapObjectDocument) => {
        // eslint-disable-next-line no-nested-ternary
        const name = object.name
          ? object.name
          : object.additionalName
            ? object.additionalName
            : '';
        let link = object.outlink
          ? object.outlink
          : `${(getLocation().pathname === '/' ? '/current' : getLocation().pathname)
          }/${
            slugify(
              name,
            )}`;
        localDebug('link is', link);
        link = urlTrim(link);
        guest.receive(link);
      }),
    );
    return guest;
  }
}
