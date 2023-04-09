import fs from 'fs'
// @ts-ignore
import path from 'path'
import lunr from 'lunr'
import { BASE_HOST } from '~/constants'

const { readFileSync } = fs
// eslint-disable-next-line import/no-named-as-default-member
const { Index } = lunr

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.isDemo) {
    throw new Error('Демо режим')
  }

  const { req } = event.node
  const url = new URL(BASE_HOST + req.url)
  const query = url.searchParams.get('query')

  const data = readFileSync(path.join('.', '/public/search-index/idx.json'))
  const idx = Index.load(JSON.parse(data.toString()))
  const result = query ? idx.search(query) : []

  return {
    result: true,
    action: 'query',
    query,
    response: result ?? [],
  }
})
