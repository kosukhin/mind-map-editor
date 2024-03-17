import Dexie from 'dexie';
import partial from 'lodash/partial';
import { idbGet } from '@/application/idbGet';

export const idbAction = (
  db: Dexie,
  actionName: string,
  dbName: string,
  payload: any[],
) => (db as any)[actionName][dbName](...payload);

const db = idbGet();
const idbUpdate = partial(idbAction, db, 'update');
const idbAdd = partial(idbAction, db, 'add');

export const idbEdit = (dbName: string, payload: any[]) => (typeof payload[0] === 'number'
  ? idbUpdate(dbName, payload)
  : idbAdd(dbName, payload));
