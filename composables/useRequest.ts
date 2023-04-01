import { Request } from '~/entities'
import { POST, PUT } from '~/constants'

export const useRequest = () => {
  const http = async <T = unknown>(request: Request<T>): Promise<unknown> => {
    let url = request.url

    if (request.params) {
      const requestParams = new URLSearchParams(request.params)
      url += '?' + requestParams.toString()
    }

    const response = await fetch(url, {
      method: request.method,
      body: [POST, PUT].includes(request.method)
        ? JSON.stringify(request.data)
        : null,
    })

    if (response.status !== 200) {
      throw new Error(`Server error ${response.status}`)
    }

    return response.json()
  }

  return {
    http,
  }
}
