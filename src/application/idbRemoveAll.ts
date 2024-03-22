export const idbRemoveAll = async () => {
  const dbs = await window.indexedDB.databases();
  dbs.forEach((db) => { window.indexedDB.deleteDatabase(db.name as any); });
};
