import fs from 'fs'
import flow from 'lodash/flow.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'
import { createFilePathByName } from '~/utils/server'
import { apply, average, objectToValues } from '~/utils/common'
import { aliases } from '~/libraries/stepper/v2'

const { $, $s, $r } = aliases

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

export const parseFileByName = flow(createFilePathByName, readFile, parse)

export const calculateAverageProgress = () =>
  apply(['__progress'], flow(parseFileByName, objectToValues, average))

export const getProgressByDay = flow(
  $s(['day']),
  $(parseFileByName, ['__progress']),
  $(get, ['prevResult', 'day', 1]),
  $r()
)

export const incrementProgress = flow(
  $s(['fileName', 'property'], ['object', 'filePath']),
  $(createFilePathByName, ['fileName'], 'filePath'),
  $(readFile, ['filePath']),
  $(parse, ['prevResult'], 'object'),
  $(get, ['object', 'property', 1]),
  $(increment, ['prevResult'], 'incremented'),
  $(set, ['object', 'property', 'incremented']),
  $(saveDocument, ['filePath', 'object']),
  $r()
)

function increment(value: string) {
  return +value + 1
}

export function currentDate() {
  return new Date().toISOString().replace(/T.+/, '')
}
