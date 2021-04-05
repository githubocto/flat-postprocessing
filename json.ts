import {readFile, writeFile} from './file.ts'

export async function readJSON(path: string, encoding = 'utf-8'): Promise<unknown> {
  return JSON.parse(await readFile(path))
}

export async function writeJSON(path: string, data: any) {
  await writeFile(path, JSON.stringify(data))
}