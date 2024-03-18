import { AnyFn } from '@/entities/Utils';

export const apply = (fn: () => void) => fn();

export const ensureTemplate = (action: 'every' | 'some', flip = false) => (...ensureFns: AnyFn[]) => (...thenFns: AnyFn[]) => {
  if (flip) {
    const tempFns = ensureFns;
    // eslint-disable-next-line no-param-reassign
    ensureFns = thenFns;
    // eslint-disable-next-line no-param-reassign
    thenFns = tempFns;
  }
  const results = ensureFns.map(apply);
  if (results[action](Boolean)) {
    thenFns.forEach(apply);
  }
};

export const fnify = (v: any) => () => v;
export const ensureEveryThen = ensureTemplate('every');
export const ensureThen = (fn: AnyFn) => ensureEveryThen(fn);
export const ensureSomeThen = ensureTemplate('some');
export const thenEveryEnsure = ensureTemplate('every', true);
export const thenEnsure = (fn: AnyFn) => thenEveryEnsure(fn);
export const thenSomeEnsure = ensureTemplate('some', true);
