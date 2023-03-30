import fs from 'fs'
import { BASE_HOST, MAP_PARAM_NAME } from '~/constants'
import { documentNormalize } from '~/utils'

const { existsSync, unlinkSync } = fs

export default defineEventHandler((event) => {
  const { req } = event.node
  const url = new URL(BASE_HOST + req.url)
  let document = url.searchParams.get(MAP_PARAM_NAME)
  document = documentNormalize(document)
  const filePath = `./maps/${document}.json`

  if (existsSync(filePath)) {
    unlinkSync(filePath)
  }

  return {
    ok: true,
  }
})
