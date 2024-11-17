import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import {
  GuestObjectType, FactoryType, GuestAwareType, SourceType,
} from 'patron-oop';
import { slugify } from 'transliteration';
import debounce from 'lodash/debounce';
import { debug } from 'debug';
import { MapNameFromUrl } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapNameFromUrl';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';
import { TextNoHtml } from '@/modules/application/l1/l2/l3/text/TextNoHtml';

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
      guest: FactoryType<GuestObjectType>,
      guestInTheMiddle: FactoryType<GuestObjectType>,
      source: FactoryType<SourceType>,
      mapNameFromUrl: FactoryType<MapNameFromUrl>,
      textNoHtml: FactoryType<TextNoHtml>
    },
  ) {}

  public open(object: MapObjectDocument, openByNameGuest: GuestObjectType<string>) {
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
            openByNameGuest.give(name);
          }),
        );
      }
    }

    return this;
  }

  public url<R extends GuestObjectType<string>>(theObject: GuestAwareType<MapObjectDocument>, guest: R) {
    theObject.value(
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

            this.factories.textNoHtml.create(
              this.factories.source.create(name),
            ).noHtml(
              this.factories.guest.create((noHtmlName: string) => {
                let link = object.outlink
                  ? object.outlink
                  : `${baseUrl}/${
                    slugify(
                      noHtmlName,
                    )}`;
                localDebug('link is', link);
                link = urlTrim(link);
                guest.give(link);
              }),
            );
          }),
        );
      }),
    );
    return guest;
  }
}
