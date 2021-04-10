import { Parser } from 'https://deno.land/x/xmlparser@v0.2.0/mod.ts'

// Example of how to fetch and read a Google spreadsheet
// For this to work without authentication, you have to publish the spreadsheet to the web
// File > Publish to the web > publish entire document as a web page
const sheetId = '1coaXmKes8b3GUFDGbmb-Hj4bek1HOEI-WCmOF4tIHwI'
const sheetNumber = 1;
const url = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${sheetNumber}/public/values`
// const url = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${sheetNumber}/public/values?alt=json` // alternative to fetch as json

// fetch the spreadsheet as XML
const response = await fetch(url)
const xml = await response.text()

// create an XML parser
const parser = new Parser({ /* options */ })
const root = parser.parse(xml)

// Go through data entries
const entries = root.getChild('feed')?.find(['entry'])
if (entries) {
    for (const entry of entries) {
        const cell = entry.getChild('cell')
        console.log(cell?.getAttr('row'), ",", cell?.getAttr('col'))
        console.log(cell?.getValue(''))
    }
}