import { Request } from "~/entities/Request";

export const http = <T = unknown>(request: Request<T>): Promise<unknown> => {
  return fetch(request.url, {
    method: request.method,
  });
}