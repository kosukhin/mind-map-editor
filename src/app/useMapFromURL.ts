import { time } from '@/modulesHigh/browser/time';
import { useRoute, useRouter } from 'vue-router';
import { branchCombinator } from '@/modules/combinators/branchCombinator';
import { modelsPoolSet } from '@/modulesHigh/models/modelsPool';

/**
 * Возмовжность открыть карту по ссылке
 */
export const useMapFromURL = () => {
  const route = useRoute();
  const router = useRouter();

  const openMapFromURL = () => {
    time.delay().then(() => {
      branchCombinator.when(route.query.view, () => {
        fetch(route.query.view as string)
          .then((r) => r.text())
          .then((r) => {
            modelsPoolSet(
              'forceFile',
              new File([r], 'current'),
            );
            return router.push('/current');
          });
      });
    });
  };

  return {
    openMapFromURL,
  };
};
