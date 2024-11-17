import {
  Factory,
  Guest,
  PatronPool,
  GuestCast,
  Patron,
  GuestChain,
  PatronOnce,
  Source,
  FactoryType,
  GuestAwareType,
  GuestAware,
  GuestSync,
  SourceEmpty,
} from 'patron-oop';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';
import { TransformedFromJSON } from '@/modules/system/transformed/TransformedFromJSON';
import { TransformedToJSON } from '@/modules/system/transformed/TransformedToJSON';
import { SvgImage } from '@/modules/application/l1/l2/visualisation/svg/SvgImage';
import { SvgMapTypeImage } from '@/modules/application/l1/l2/visualisation/svg/SvgMapTypeImage';
import { NumberChunks } from '@/modules/application/l1/l2/l3/number/NumberChunks';
import { MapNameFromUrl } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapNameFromUrl';
import { TextNoHtml } from '@/modules/application/l1/l2/l3/text/TextNoHtml';
import { JSONP } from '@/modules/application/l1/l2/requests/JSONP';
import { TextOf } from '@/modules/application/l1/l2/l3/l4/text/TextOf';
import { TextWithoutHTML } from '@/modules/application/l1/l2/l3/l4/text/TextWithoutHTML';
import { TextNlAsBr } from '@/modules/application/l1/l2/l3/l4/text/TextNlAsBr';

const cache = new Factory(Source);
const source = new Factory(Source);
const sourceEmpty = new Factory(SourceEmpty);
const guest = new Factory(Guest);
const guestCast = new Factory(GuestCast);
const guestAware: FactoryType<GuestAwareType> = new Factory(GuestAware);
const pool = new Factory(PatronPool);
const patron = new Factory(Patron);
const patronOnce = new Factory(PatronOnce);
const guestInTheMiddle = new Factory(GuestCast);
const chain = new Factory(GuestChain);
const guestSync = new Factory(GuestSync);

const systemFactories = {
  cache,
  chain,
  guest,
  guestCast,
  guestAware,
  guestInTheMiddle,
  guestSync,
  patron,
  patronOnce,
  pool,
  source,
  sourceEmpty,
};

const fileHandlerContent = new Factory(SystemFileFromHandler);
const browserFileSaved = new Factory(BrowserFileSaved);
const transformToString = new Factory(TransformedToJSON);
const transformToObject = new Factory(TransformedFromJSON);
const svgImage = new Factory(SvgImage);
const svgMapTypeImage = new Factory(SvgMapTypeImage, { ...systemFactories, svgImage });
const numberChunks = new Factory(NumberChunks, systemFactories);
const mapNameFromUrl = new Factory(MapNameFromUrl, systemFactories);
const textNoHtml = new Factory(TextNoHtml, systemFactories);
const jsonp = new Factory(JSONP, systemFactories);

const textOf = new Factory(TextOf);
const textWithoutHTML = new Factory(TextWithoutHTML, systemFactories);
const textNlAsBr = new Factory(TextNlAsBr, systemFactories);

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

  textOf,
  textNlAsBr,
  textWithoutHTML,
};

export const useFactories = () => factories;
