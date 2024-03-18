import Dexie from 'dexie';
import partial from 'lodash/partial';

const db = new Dexie('MapsDatabase');
db.version(1).stores({
  maps: '++id,name,map',
  projects: '++id,name,directoryHandle,blobs',
});

type DB = Dexie & { maps: any; projects: any }

export const idbGet = () => db as DB;

export const idbFind = (
  innerDb: Dexie,
  dbName: string,
  whereField?: string,
  compareFn?: string,
  whereFieldValue?: any,
) => {
  let table = (innerDb as any)[dbName];

  if (whereField && compareFn && whereFieldValue) {
    table = table.where(whereField)[compareFn](whereFieldValue);
  }

  return table.toArray();
};

export const idbFindDb = partial(idbFind, db);
