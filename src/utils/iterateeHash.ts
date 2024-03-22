import { get } from 'lodash';

export const iterateeHash = (
  keyField: string,
  valueField: string,
) => (acc: any, item: any) => {
  acc[get(item, keyField, '')] = get(item, valueField, null);
  return acc;
};
