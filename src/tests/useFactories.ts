import {
  Factory, FactoryType, Guest, GuestAware, GuestAwareObjectType,
  GuestCast, GuestAwareAll, GuestSync, Patron, PatronOnce, PatronPool, Source, SourceEmpty,
} from 'patron-oop';

const cache = new Factory(Source);
const source = new Factory(Source);
const sourceEmpty = new Factory(SourceEmpty);
const guest = new Factory(Guest);
const guestCast = new Factory(GuestCast);
const guestAware: FactoryType<GuestAwareObjectType<any>> = new Factory(GuestAware);
const pool = new Factory(PatronPool);
const patron = new Factory(Patron);
const patronOnce = new Factory(PatronOnce);
const guestInTheMiddle = new Factory(GuestCast);
const chain = new Factory(GuestAwareAll);
const guestSync = new Factory(GuestSync);

export const useFactories = () => ({
  cache,
  source,
  sourceEmpty,
  guest,
  guestCast,
  guestAware,
  pool,
  patron,
  patronOnce,
  guestInTheMiddle,
  chain,
  guestSync,
});
