import { assertArrayIncludes } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { readCSV, writeCSV } from '../src/csv.ts'

const csvReadPath = './examples/csv/prices.csv'
const csvWritePath = './examples/csv/names.csv'

Deno.test("reads a csv file", async () => {
    const csv = await readCSV(csvReadPath)

    assertArrayIncludes(csv, [{ Name: "One", Amount: "500", Price: "$0.5" }]);
});

Deno.test("reads a csv file without header", async () => {
    const csv = await readCSV(csvReadPath, { 
        skipFirstRow: true
    })

    assertArrayIncludes(csv, [{ Name: "Two", Amount: "13", Price: "$10" }]);
});

Deno.test("writes a csv file", async () => {
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
    await writeCSV(csvWritePath, data)
    const csv = await readCSV(csvWritePath)

    assertArrayIncludes(csv, [{ age: "70", name: "Rick" }]);
});