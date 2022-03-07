// @deno-types="https://deno.land/x/sheetjs/types/index.d.ts"
import * as xlsx from 'https://deno.land/x/sheetjs@v0.18.3/xlsx.mjs';
import * as cptable from 'https://deno.land/x/sheetjs@v0.18.3/dist/cpexcel.full.mjs';
xlsx.set_cptable(cptable);

// read more about the library here: https://github.com/SheetJS/sheetjs
export { xlsx }

// returns a Workbook
export async function readXLSX(path: string) {
    const data = await Deno.readFile(path)
    const workbook = xlsx.read(data)
    return workbook
}