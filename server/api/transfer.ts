import fs from 'fs'
import { createFilePathByUrl } from '~/utils'
import { saveDocument } from '~/utils/server-only'

const { existsSync, readFileSync } = fs

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.isDemo) {
    return {
      ok: false,
    }
  }

  const { req } = event.node
  const filePath = './' + createFilePathByUrl(req.url)
  const body = await readBody(event)
  const fileExists = existsSync(filePath)

  if (fileExists) {
    console.log('file ', filePath)
    const map = JSON.parse(readFileSync(filePath).toString())
    const newObject = body.object
    map.structure.objects[newObject.id] = newObject
    map.structure.types[body.type.id] = body.type
    saveDocument(filePath, map)
  }

  return {
    ok: true,
  }
})
