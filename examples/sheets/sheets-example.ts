import { Parser } from 'https://deno.land/x/xmlparser@v0.2.0/mod.ts'

// Example of how to fetch and read a Google spreadsheet
// For this to work without authentication, you have to publish the spreadsheet to the web
// File > Publish to the web > publish entire document as a csv file

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQT7KW2U7o4zh2Sh5qpTl42OQzbKZG-glDd3rVcXhvQ1MtXTQiitvGEV6xvkfrXAn1dYADV1qLc2CEC/pub?output=csv'

// fetch the spreadsheet as XML
const response = await fetch(url)
const csv = await response.text()
console.log(csv);
