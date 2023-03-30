import { Request } from '~/entities/Request'

export const http = async <T = unknown>(
  request: Request<T>
): Promise<unknown> => {
  let url = request.url

  if (request.params) {
    const requestParams = new URLSearchParams(request.params)
    url += '?' + requestParams.toString()
  }

  const response = await fetch(url, {
    method: request.method,
    body: ['post', 'put'].includes(request.method)
      ? JSON.stringify(request.data)
      : null,
  })

  if (response.status !== 200) {
    throw new Error(`Server errror ${response.status}`)
  }

  return response.json()
}
