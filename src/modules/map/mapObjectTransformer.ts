import { MapObject } from '@/entities/Map';

export const mapObjectTransformer = {
  isIncludesInAdditionalFields(
    object: MapObject,
    searchQuery: string,
  ) {
    return !!object.additionalFields
      && Object.values(object.additionalFields).some((v) => v.toLowerCase().includes(searchQuery));
  },
  isIncludesInField(
    object: MapObject,
    fieldName: keyof MapObject,
    searchQuery: string,
  ) {
    const fieldValue = object[fieldName];
    return String(fieldValue).toLowerCase().includes(searchQuery);
  },
};
