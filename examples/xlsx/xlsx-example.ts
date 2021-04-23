import { xlsx, readXLSX } from '../../src/xlsx.ts' // replace with latest library https://deno.land/x/flat@0.0.x/mod.ts
import { writeCSV } from '../../src/csv.ts' // replace with latest library https://deno.land/x/flat@0.0.x/mod.ts

const inputFilename = './examples/xlsx/prices.xlsx'
const outputFilename = './examples/xlsx/prices.csv'

// read about what the xlsx library can do here: https://github.com/SheetJS/sheetjs

const workbook = await readXLSX(inputFilename)
const sheetData = workbook.Sheets[workbook.SheetNames[0]]
const csvString = await xlsx.utils.sheet_to_csv(sheetData) // can use to_json, to_txt, to_html, to_formulae

// Write to csv
writeCSV(outputFilename, csvString)