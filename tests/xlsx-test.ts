import { assertEquals, assertStringIncludes } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { xlsx, readXLSX } from '../src/xlsx.ts'

const xlsxReadPath = './examples/xlsx/prices.xlsx'

Deno.test("xlsx library contains keys and functions", () => {
    assertEquals(typeof xlsx.utils.sheet_to_csv, "function")
})

Deno.test("reads a XLSX file", async () => {
    const workbook = await readXLSX(xlsxReadPath)
    const sheetData = workbook.Sheets[workbook.SheetNames[0]]
    const csvString = await xlsx.utils.sheet_to_csv(sheetData)

    assertStringIncludes(csvString, "Two,13,$10")
})