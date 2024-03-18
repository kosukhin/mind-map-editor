import { BASE_HOST, MAP_PARAM_NAME } from '@/constants/server';
import { trim } from 'lodash';

export const documentNormalize = (document: string | null) => {
  let innerDocument = document;
  innerDocument = trim(String(document), '/');
  if (document && document.includes('/')) {
    innerDocument = `_${document.replaceAll('/', '_')}`;
  }

  return innerDocument && innerDocument.toLowerCase();
};

export function getDocumentName(url: string) {
  const urlObject = new URL(BASE_HOST + url);

  return urlObject.searchParams.get(MAP_PARAM_NAME);
}
