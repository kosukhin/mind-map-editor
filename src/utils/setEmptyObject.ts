import { set } from 'lodash';

export const setEmptyObject = (field: string, object: any) => set(object, field, {});
