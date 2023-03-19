export type RequestMethod = 'get' | 'post';

export interface Request<T> {
  url: string,
  method: RequestMethod,
  params?: Record<string, string>,
  data?: T,
}