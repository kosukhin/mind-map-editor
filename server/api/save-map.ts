import fs from 'fs'
import { documentNormalize } from '../../utils'
import { BASE_HOST, MAP_PARAM_NAME } from '~/constants'

const { writeFileSync } = fs

export default defineEventHandler(async (event) => {
  const { req } = event.node
  const url = new URL(BASE_HOST + req.url)
  let document = url.searchParams.get(MAP_PARAM_NAME)
  document = documentNormalize(document)
  const filePath = `./maps/${document}.json`

  const body = await readBody(event)
  writeFileSync(filePath, JSON.stringify(body))

  return {
    ok: true,
  }
})
