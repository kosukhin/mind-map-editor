import fs from 'fs'
import path from 'path'
import { slugify } from 'transliteration'
import { MapStructure } from '~/entities'
import { urlTrim } from '~/utils'
import { DEMO_FILES } from '~/constants'

const { readdirSync, readFileSync } = fs

export default defineEventHandler(() => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.isDemo) {
    return {
      ok: true,
      files: DEMO_FILES,
    }
  }

  const files = readdirSync(path.join('.', '/public/maps/'))
    .filter((file) => {
      return file[0] !== '_' && !['README.md'].includes(file)
    })
    .map((file) => {
      let content = {}
      let url = ''

      try {
        content = JSON.parse(
          readFileSync(path.join('.', `/public/maps/${file}`)).toString()
        ) as MapStructure
        const structure = (content as any).structure as MapStructure

        if (structure.settings) {
          file = structure.settings.title
        }

        url = slugify(urlTrim(structure.url))
      } catch (e) {
        console.log(e)
      }

      return {
        name: file,
        url,
      }
    })

  return {
    ok: true,
    files,
  }
})
