import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';
import { slugify } from 'transliteration';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import debounce from 'lodash/debounce';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { debug } from 'debug';
import { SourceType } from '@/modules/system/guest/SourceType';
import { MapNameFromUrl } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapNameFromUrl';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';

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
    private mapId: MapCurrentIDType,
    private factories: {
      guest: FactoryType<GuestType>,
      guestInTheMiddle: FactoryType<GuestType>,
      source: FactoryType<SourceType>,
      mapNameFromUrl: FactoryType<MapNameFromUrl>,
    },
  ) {}

  public open(object: MapObjectDocument, openByNameGuest: GuestType<string>) {
    if (object?.linked) {
      const url = object.outlink;
      if (object.targetBlank) {
        openExternalLink(url);
      } else {
        localDebug('open new map', url);
        const mapNameFromUrl = this.factories.mapNameFromUrl.create(
          this.factories.source.create(url),
        );
        mapNameFromUrl.name(
          this.factories.guest.create((name: string) => {
            localDebug('open map name', url, name);
            openByNameGuest.receive(name);
          }),
        );
      }
    }

    return this;
  }

  public url<R extends GuestType<string>>(theObject: GuestAwareType<MapObjectDocument>, guest: R) {
    theObject.receiving(
      this.factories.guestInTheMiddle.create(guest, (object: MapObjectDocument) => {
        this.mapId.id(
          this.factories.guest.create((mapId: string) => {
            const baseUrl = mapId[0] === '_' ? mapId.replaceAll('_', '/') : '/current';
            // eslint-disable-next-line no-nested-ternary
            const name = object.name
              ? object.name
              : object.additionalName
                ? object.additionalName
                : '';
            let link = object.outlink
              ? object.outlink
              : `${baseUrl}/${
                slugify(
                  name,
                )}`;
            localDebug('link is', link);
            link = urlTrim(link);
            guest.receive(link);
          }),
        );
      }),
    );
    return guest;
  }
}
