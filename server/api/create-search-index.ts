import fs from 'fs'
import path from 'path'
// @ts-ignore
import lunr from 'lunr'
// @ts-ignore
import lunrLanguagesStemmer from 'lunr-languages/lunr.stemmer.support.js'
// @ts-ignore
import lunrLanguagesMulti from 'lunr-languages/lunr.multi.js'
// @ts-ignore
import lunrLanguagesRu from 'lunr-languages/lunr.ru.js'
import { MapStructure } from '~/entities'

lunrLanguagesStemmer(lunr)
lunrLanguagesMulti(lunr)
lunrLanguagesRu(lunr)

const { readFileSync, readdirSync } = fs

export default defineEventHandler(() => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.isDemo) {
    throw new Error('Демо режим')
  }

  const dirs = readdirSync(path.join('.', '/public/maps')).filter((file) => {
    return !['README.md', '.git'].includes(file)
  })
  const documents: any[] = []
  dirs.forEach((dir) => {
    const data = readFileSync(path.join('.', '/public/maps/') + dir)
    let document
    try {
      document = JSON.parse(data.toString()) as {
        structure: MapStructure
      }
    } catch {
      return
    }

    Object.values(document.structure.objects).forEach((object) => {
      documents.push({
        name: object.name + '|' + (document.structure.url ?? 'no'),
        text: object.description + ' ' + object.name,
      })
    })
  })
  const idx = lunr(function () {
    // @ts-ignore
    this.use(lunr.multiLanguage('en', 'ru'))
    // @ts-ignore
    this.ref('name')
    // @ts-ignore
    this.field('text')

    documents.forEach(function (doc) {
      // @ts-ignore
      this.add(doc)
      // @ts-ignore
    }, this)
  })
  const serializedIdx = JSON.stringify(idx)
  fs.writeFileSync(
    path.join('.', '/public/search-index/idx.json'),
    serializedIdx
  )

  return {
    result: true,
    action: 'index',
    // documents,
    response: 'Записано документов: ' + documents.length,
  }
})
