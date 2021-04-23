import xlsxlib from 'https://jspm.dev/xlsx'
import * as XLSX from 'https://cdn.deno.land/sheetjs/versions/v0.16.8/raw/types/index.d.ts';
const xlsx = xlsxlib as typeof XLSX;

// read more about the library here: https://github.com/SheetJS/sheetjs

export { xlsx } // export the right types for this lib

// returns a Workbook
export async function readXLSX(path: string) {
    const rawText = await Deno.readFile(path)
    const workbook = await xlsx.read(rawText, { type: 'buffer' })
    return workbook
}