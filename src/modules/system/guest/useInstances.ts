import { Instance } from '@/modules/system/guest/Instance';
import { SystemFileFromHandler } from '@/modules/system/file/SystemFileFromHandler';
import { BrowserFileSaved } from '@/modules/integration/browser/file/BrowserFileSaved';
import { Cache } from '@/modules/system/guest/Cache';
import { Guest } from '@/modules/system/guest/Guest';
import { GuestExecutorType } from '@/modules/system/guest/GuestExecutorType';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { GuestInTheMiddle } from '@/modules/system/guest/GuestInTheMiddle';
import { GuestType } from '@/modules/system/guest/GuestType';
import { TransformedFromJSON } from '@/modules/system/transformed/TransformedFromJSON';
import { TransformedToJSON } from '@/modules/system/transformed/TransformedToJSON';
import { Transformed } from '@/modules/system/transformed/Transformed';
import { Patron } from '@/modules/system/guest/Patron';

const fileHandlerContent = new Instance(
  (value) => new SystemFileFromHandler(<FileSystemFileHandle>value),
);
const browserFileSaved = new Instance(
  (value) => new BrowserFileSaved(<FileSystemFileHandle>value),
);
const cache = new Instance((initiator, defaultValue = null) => new Cache(initiator, defaultValue));
const guest = new Instance((executor) => new Guest(<GuestExecutorType<unknown>>executor));
const patronPool = new Instance((initiator) => new PatronPool(initiator));
const patron = new Instance((value) => new Patron(<GuestType<unknown>>value));
const guestInTheMiddle = new Instance(
  (guestDep, executor) => new GuestInTheMiddle(
    <GuestType<unknown>>guestDep,
    <GuestExecutorType<unknown>>executor,
  ),
);
const transformToString = new Instance<Transformed<string>, [string]>((value) => new TransformedFromJSON(<string>value));
const transformToObject = new Instance((value) => new TransformedToJSON(value));

export const useInstances = () => ({
  fileHandlerContent,
  browserFileSaved,
  cache,
  guest,
  guestInTheMiddle,
  patron,
  patronPool,
  transformToString,
  transformToObject,
});
