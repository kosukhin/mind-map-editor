import fs from 'fs'
import path from 'path'
import { slugify } from 'transliteration'
import { MapStructure } from '~/entities'
import { urlTrim } from '~/utils'
import { BASE_HOST, MAP_PARAM_NAME } from '~/constants'

const { readdirSync, readFileSync } = fs

export default defineEventHandler((event) => {
  const { req } = event.node
  const url = new URL(BASE_HOST + req.url)
  const document = url.searchParams.get(MAP_PARAM_NAME)
  const files = readdirSync(document ?? './')

  return {
    url: req.url,
    files,
    document,
  }

  // const files = readdirSync(path.join('.', '/public/maps/'))
  //   .filter((file) => {
  //     return file[0] !== '_' && !['README.md'].includes(file)
  //   })
  //   .map((file) => {
  //     let content = {}
  //     let url = ''
  //
  //     try {
  //       content = JSON.parse(
  //         readFileSync(path.join('.', `/public/maps/${file}`)).toString()
  //       ) as MapStructure
  //       const structure = (content as any).structure as MapStructure
  //
  //       if (structure.settings) {
  //         file = structure.settings.title
  //       }
  //
  //       url = slugify(urlTrim(structure.url))
  //     } catch (e) {}
  //
  //     return {
  //       name: file,
  //       url,
  //     }
  //   })
  //
  // return {
  //   ok: true,
  //   files,
  // }
})
