import { vueUnrefList } from '@/utils/vueUnrefList';
import { withList } from '@/utils/withList';
import { compose } from 'lodash/fp';

export const vueWithList = compose(withList, vueUnrefList);
