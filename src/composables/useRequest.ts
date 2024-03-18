import { Request } from '@/entities';
import { POST, PUT } from '@/constants';

// FIXME убрать в функции
export function useRequest() {
  const http = async <T = unknown>(request: Request<T>): Promise<unknown> => {
    let { url } = request;
    if (request.params) {
      const requestParams = new URLSearchParams(request.params);
      url += `?${requestParams.toString()}`;
    }
    const response = await fetch(url, {
      method: request.method,
      body: ([POST, PUT].includes(request.method)
        ? JSON.stringify(request.data)
        : null) as string,
    });
    if (response.status !== 200) {
      throw new Error(`Server error ${response.status}`);
    }
    return response.json();
  };

  return {
    http,
  };
}
