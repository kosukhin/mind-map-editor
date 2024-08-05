import { MapObjectStructure } from '@/entities/MapStructures';

export const mapObjectTransformer = {
  isIncludesInAdditionalFields(
    object: MapObjectStructure,
    searchQuery: string,
  ) {
    return !!object.additionalFields
      && Object.values(object.additionalFields).some((v) => v.toLowerCase().includes(searchQuery));
  },
  isIncludesInField(
    object: MapObjectStructure,
    fieldName: keyof MapObjectStructure,
    searchQuery: string,
  ) {
    const fieldValue = object[fieldName];
    return String(fieldValue).toLowerCase().includes(searchQuery);
  },
  filterObjectsByType(
    objects: MapObjectStructure[],
    typeName: string,
  ) {
    return objects.filter((object) => object.type === typeName);
  },
  firstAdditionalField(object: MapObjectStructure) {
    return Object
      .values(object.additionalFields ?? {})
      .filter(Boolean).shift();
  },
};
