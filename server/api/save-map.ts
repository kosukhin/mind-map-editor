import { createFilePathByUrl } from '~/utils'
import {
  currentDate,
  incrementProgress,
  saveDocument,
} from '~/utils/server-only'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.isDemo) {
    return {
      ok: false,
    }
  }

  const { req } = event.node
  const filePath = createFilePathByUrl(req.url)

  const body = await readBody(event)
  saveDocument(filePath, body)
  const date = currentDate()
  incrementProgress('__progress', date)

  return {
    ok: true,
  }
})
