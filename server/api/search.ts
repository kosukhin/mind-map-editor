import fs from 'fs'
// @ts-ignore
import lunr from 'lunr'
import { BASE_HOST } from '~/constants'

const { readFileSync } = fs
const { Index } = lunr

export default defineEventHandler((event) => {
  const { req } = event.node
  const url = new URL(BASE_HOST + req.url)
  const query = url.searchParams.get('query')

  const data = readFileSync('./search-index/idx.json')
  const idx = Index.load(JSON.parse(data.toString()))
  const result = query ? idx.search(query) : []

  return {
    result: true,
    action: 'query',
    query,
    response: result ?? [],
  }
})
