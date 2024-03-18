import { GetMapsResponse } from '@/entities/GetMapsResponse';

// FIXME убрать в функции
export function useRequestGetMaps() {
  const getMaps = (): Promise<GetMapsResponse> => Promise.resolve({
    ok: true,
    progress: {},
    favorites: {},
    files: [{ name: 'string', url: 'string' }],
  });

  return {
    getMaps,
  };
}
