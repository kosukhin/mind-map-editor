import fs from 'fs'
import path from 'path'
import { BASE_HOST, MAP_PARAM_NAME } from '~/constants'
import { documentNormalize } from '~/utils'

const { existsSync, readFileSync } = fs

export default defineEventHandler((event) => {
  const { req } = event.node
  const url = new URL(BASE_HOST + req.url)
  let document = url.searchParams.get(MAP_PARAM_NAME)
  document = documentNormalize(document)
  const filePath = path.join('.', `/maps/${document}.json`)
  const fileExists = existsSync(filePath)
  let data = {}
  const parentTypes: any = {}

  if (fileExists) {
    data = JSON.parse(readFileSync(filePath).toString())
  }

  const dataStructure = (data as any).structure

  if (document) {
    const documentParts = document.split('_')
    let parentName = ''

    for (let i = 1; i < documentParts.length - 1; i++) {
      if (i !== 1 && parentName[0] && parentName[0] !== '_') {
        parentName = '_' + parentName
      }
      if (i !== 1) {
        parentName += '_' + documentParts[i]
      } else {
        parentName += documentParts[i]
      }

      if (
        parentName &&
        existsSync(path.join('.', `/maps/${parentName}.json`))
      ) {
        const parentData = readFileSync(
          path.join('.', `/maps/${parentName}.json`)
        )
        const parentMap = JSON.parse(parentData.toString())

        if (parentMap.structure?.settings?.title && dataStructure) {
          if (!dataStructure.parentNames) {
            dataStructure.parentNames = {}
          }
          dataStructure.parentNames[documentParts[i]] =
            parentMap.structure.settings.title
        }

        if (parentMap.structure.types) {
          Object.assign(parentTypes, parentMap.structure.types)
        }
      }
    }
  }

  return {
    ok: fileExists,
    document,
    data,
    parentTypes: Object.values(parentTypes),
  }
})
