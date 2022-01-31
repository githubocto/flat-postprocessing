import xlsxlib from 'https://jspm.dev/xlsx@0.17.4'
import { XLSX } from "./xlsx-types.ts";
const xlsx = xlsxlib as XLSX;

// read more about the library here: https://github.com/SheetJS/sheetjs

export { xlsx } // export the right types for this lib

// returns a Workbook
export async function readXLSX(path: string) {
    const rawText = await Deno.readFile(path)
    const workbook = await xlsx.read(rawText, { type: 'buffer' })
    return workbook
}