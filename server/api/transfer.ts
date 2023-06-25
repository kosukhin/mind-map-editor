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

  console.log('try transfer', filePath)
  console.log('body', body, 'exists', fileExists)

  if (fileExists) {
    console.log('file ', filePath)
    const map = JSON.parse(readFileSync(filePath).toString())
    const newObject = body.object
    map.structure.objects[newObject.id] = newObject
    console.log(map)
    saveDocument(filePath, map)
  }

  return {
    ok: true,
  }
})
