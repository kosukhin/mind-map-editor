import { AnyFn } from '@/entities/Utils';

export const branchCombinator = {
  when(
    condition: unknown,
    doThing: AnyFn,
    defaultResult: unknown = null,
  ) {
    if (condition) {
      defaultResult = doThing(condition);
    }

    return defaultResult as ReturnType<typeof doThing>;
  },
};
