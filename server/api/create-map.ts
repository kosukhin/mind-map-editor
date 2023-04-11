import path from 'path'
import fs from 'fs'
import { createMap } from '~/utils'

const { writeFileSync } = fs

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.isDemo) {
    throw new Error('Демо режим')
  }

  const body = await readBody(event)
  let document = ''

  if (body.name) {
    const map = createMap('', body.name)
    const filePath = path.join('.', `/public/maps/${map.document}.json`)
    writeFileSync(
      filePath,
      JSON.stringify({ document: map.document, structure: map })
    )
    document = map.document
  }

  return {
    ok: true,
    document,
  }
})
