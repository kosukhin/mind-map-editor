import fs from 'fs'
import flow from 'lodash/flow.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'
import { createFilePathByName } from '~/utils/server'
import { stateStepper } from '~/libraries/stateStepper'

const { writeFileSync, readFileSync } = fs
export function saveDocument(filePath: string, body: any) {
  writeFileSync(filePath, JSON.stringify(body))
}

export function parse(data: string) {
  return JSON.parse(data)
}

export function readFile(filePath: string): string {
  const defaultValue = '{}'
  try {
    return readFileSync(filePath).toString() ?? defaultValue
  } catch {
    return defaultValue
  }
}

export const getProgressByDay = (day: string) =>
  stateStepper(
    {
      day,
      fileName: '__progress',
      defaultValue: 1,
    },
    (step) =>
      flow(
        step(createFilePathByName, ['fileName']),
        step(readFile, ['prevResult']),
        step(parse, ['prevResult']),
        step(get, ['prevResult', 'day', 'defaultValue'])
      )
  )

export const incrementProgress = (file: string, property: string) =>
  stateStepper(
    {
      object: {},
      fileName: file,
      getProperty: property,
      filePath: null,
      defaultValue: 1,
    },
    (step) =>
      flow(
        step(createFilePathByName, ['fileName'], 'filePath'),
        step(readFile, ['filePath']),
        step(parse, ['prevResult'], 'object'),
        step(get, ['object', 'getProperty', 'defaultValue']),
        step(increment, ['prevResult'], 'incremented'),
        step(set, ['object', 'getProperty', 'incremented']),
        step(saveDocument, ['filePath', 'object'])
      )
  )

function increment(value: string) {
  return +value + 1
}

export function currentDate() {
  return new Date().toISOString().replace(/T.+/, '')
}
