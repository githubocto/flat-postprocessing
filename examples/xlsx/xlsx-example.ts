import { xlsx, readXLSX } from '../../xlsx.ts'
import {  writeCSV } from '../../csv.ts'

const inputFilename = './examples/xlsx/prices.xlsx'
const outputFilename = './examples/xlsx/prices.csv'

// read about what the xlsx library can do here: https://github.com/SheetJS/sheetjs

const workbook = await readXLSX(inputFilename)
const sheetData = workbook.Sheets[workbook.SheetNames[0]]
const csvString = await xlsx.utils.sheet_to_csv(sheetData) // can use to_json, to_txt, to_html, to_formulae

// Write to csv
writeCSV(outputFilename, csvString)