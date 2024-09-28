import { Factory } from '@/modules/system/guest/Factory';
import { FactoryWithFactories } from '@/modules/system/guest/FactoryWithFactories';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';
import { Cache } from '@/modules/system/guest/Cache';
import { Guest } from '@/modules/system/guest/Guest';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { GuestInTheMiddle } from '@/modules/system/guest/GuestInTheMiddle';
import { TransformedFromJSON } from '@/modules/system/transformed/TransformedFromJSON';
import { TransformedToJSON } from '@/modules/system/transformed/TransformedToJSON';
import { Patron } from '@/modules/system/guest/Patron';
import { Chain } from '@/modules/system/guest/Chain';
import { PatronOnce } from '@/modules/system/guest/PatronOnce';
import { GuestCast } from '@/modules/system/guest/GuestCast';
import { SvgImage } from '@/modules/application/l1/l2/visualisation/svg/SvgImage';
import { SvgMapTypeImage } from '@/modules/application/l1/l2/visualisation/svg/SvgMapTypeImage';
import { NumberChunks } from '@/modules/application/l1/l2/l3/number/NumberChunks';
import { Source } from '@/modules/system/guest/Source';
import { MapNameFromUrl } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapNameFromUrl';
import { TextNoHtml } from '@/modules/application/l1/l2/l3/text/TextNoHtml';
import { JSONP } from '@/modules/application/l1/l2/requests/JSONP';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { GuestAware } from '@/modules/system/guest/GuestAware';

const cache = new Factory(Cache);
const source = new Factory(Source);
const guest = new Factory(Guest);
const guestCast = new Factory(GuestCast);
const guestAware: FactoryType<GuestAwareType> = new Factory(GuestAware);
const pool = new Factory(PatronPool);
const patron = new Factory(Patron);
const patronOnce = new Factory(PatronOnce);
const guestInTheMiddle = new Factory(GuestInTheMiddle);
const chain = new Factory(Chain);

const systemFactories = {
  cache,
  chain,
  guest,
  guestCast,
  guestAware,
  guestInTheMiddle,
  patron,
  patronOnce,
  pool,
  source,
};

const fileHandlerContent = new Factory(SystemFileFromHandler);
const browserFileSaved = new Factory(BrowserFileSaved);
const transformToString = new Factory(TransformedToJSON);
const transformToObject = new Factory(TransformedFromJSON);
const svgImage = new Factory(SvgImage);
const svgMapTypeImage = new FactoryWithFactories(SvgMapTypeImage, { ...systemFactories, svgImage });
const numberChunks = new FactoryWithFactories(NumberChunks, systemFactories);
const mapNameFromUrl = new FactoryWithFactories(MapNameFromUrl, systemFactories);
const textNoHtml = new FactoryWithFactories(TextNoHtml, systemFactories);
const jsonp = new FactoryWithFactories(JSONP, systemFactories);

const factories = {
  ...systemFactories,

  fileHandlerContent,
  browserFileSaved,

  transformToString,
  transformToObject,

  svgImage,
  svgMapTypeImage,

  numberChunks,

  mapNameFromUrl,
  textNoHtml,

  jsonp,
};

export const useFactories = () => factories;
