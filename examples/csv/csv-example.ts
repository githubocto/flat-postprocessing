import { readCSV, writeCSV } from '../../src/csv.ts' // replace with latest library https://deno.land/x/flat@0.0.x/mod.ts
  
// Path to a csv file
const csvPath = './examples/csv/prices.csv';

/* 
Parse a csv file and return an object[]

[
  { Name: "One", Amount: "500", Price: "$0.5" },
  { Name: "Two", Amount: "13", Price: "$10" },
  { Name: "Three", Amount: "-3", Price: "$3000" }
]
*/
const originalCSV = await readCSV(csvPath)
console.log(originalCSV)

/*
Can use other options for reading CSV
More detail on options can be found here: https://deno.land/std@0.92.0/encoding#csv
*/
const csvOptions = await readCSV(csvPath, { 
    separator: ',', // can use an optional separator. default is comma
    trimLeadingSpace: false, // whether to trim the leading space. default is false
    lazyQuotes: false // Allow unquoted quote in a quoted field or non double quoted quotes in quoted field. default is false
})
console.log(csvOptions);

/*
Parse a CSV file, skip the first row, and rename the column headers. Return an object[]

[
  { id: "One", quantity: "500", cost: "$0.5" },
  { id: "Two", quantity: "13", cost: "$10" },
  { id: "Three", quantity: "-3", cost: "$3000" }
]
*/
const renameColumnsCSV = await readCSV(csvPath, {
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
Write data to a CSV file

age,name
70,Rick
14,Smith
*/
const data = [
    { 
        age: 70,
        name: 'Rick'
    },
    {
        age: 14,
        name: 'Smith'
    }
]
writeCSV('./examples/csv/names.csv', data)

/*
Write one of the previously parsed csv examples

id,quantity,cost
One,50,$0.5
Two,1.3,$10
Three,-0.3,$3000
*/
console.log(parseColumnCSV)
writeCSV('./examples/csv/prices-write.csv', parseColumnCSV)
