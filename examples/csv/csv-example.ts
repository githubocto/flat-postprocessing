import { Column, DataItem, stringify } from 'https://deno.land/std@0.92.0/encoding/csv.ts';
import { readCSV, writeCSV } from 'https://deno.land/x/flat@0.0.2/mod.ts'
  
// Path to a csv file
const csvPath = './examples/csv/prices.csv';

/* 
Parse a csv file and return a string[][]

[
  [ "Name", "Amount", "Price" ],
  [ "One", "500", "$0.5" ],
  [ "Two", "13", "$10" ],
  [ "Three", "-3", "$3000" ]
]
*/
const originalCSV = await readCSV(csvPath)
console.log(originalCSV)

/*
Parse a CSV file and skip the first row. Return an object[]

[
  { Name: "One", Amount: "500", Price: "$0.5" },
  { Name: "Two", Amount: "13", Price: "$10" },
  { Name: "Three", Amount: "-3", Price: "$3000" }
]
*/
const skipFirstRowCSV = await readCSV(csvPath, { 
    skipFirstRow: true
    // separator: ',' // can use an optional separator. default is comma
    // trimLeadingSpace: false, // whether to trim the leading space. default is false
    // lazyQuotes: false // Allow unquoted quote in a quoted field or non double quoted quotes in quoted field. default is false
})
console.log(skipFirstRowCSV);

/*
Parse a CSV file, skip the first row, and rename the column headers. Return an object[]

[
  { id: "One", quantity: "500", cost: "$0.5" },
  { id: "Two", quantity: "13", cost: "$10" },
  { id: "Three", quantity: "-3", cost: "$3000" }
]
*/
const renameColumnsCSV = await readCSV(csvPath, {
    skipFirstRow: true,
    columns: ['id', 'quantity', 'cost'],
});
console.log(renameColumnsCSV);

/*
Parse a CSV file, skip the first row, and apply a custom function to the second 'quantity' row. Returns an object[]

[
  { id: "One", quantity: "50", cost: "$0.5" },
  { id: "Two", quantity: "1.3", cost: "$10" },
  { id: "Three", quantity: "-0.3", cost: "$3000" }
]
*/
const parseColumnCSV = await readCSV(csvPath, {
    skipFirstRow: true,
    columns: [
        { 
            name: 'id'
        },
        { 
            name: 'quantity',
            parse: (e: string): string => {
                return `${parseFloat(e) / 10}`
            }
        },
        { 
            name: 'cost' 
        }
    ],
});
console.log(parseColumnCSV)

/*
Write data to a file with a header row

name,age
Rick,70
Smith,14
*/
const data = [
    {
        age: 70,
        name: "Rick"
    },
    {
        age: 14,
        name: "Smith"
    },
];
const columns: Column[] = ["name", "age"];

// we have to stringify the data with a row header
const dataString = await stringify(data, columns)
writeCSV('./examples/csv/names.csv', dataString)

/*
Write one of the previously parsed csv examples

id,quantity,cost
One,50,$0.5
Two,1.3,$10
Three,-0.3,$3000
*/
const data2 = parseColumnCSV as DataItem[]; // have to recast the output
const columns2: Column[] = ["id", "quantity", "cost"];
const dataString2 = await stringify(data2, columns2)
writeCSV('./examples/csv/prices-write.csv', dataString2)
