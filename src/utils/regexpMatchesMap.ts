import { compose } from 'lodash/fp';
import { regexpMatches } from '@/utils/regexpMatches';
import { buildMapFromArray } from '@/utils/buildMapFromArray';

export const regexpMatchesMap = compose(buildMapFromArray, regexpMatches);
