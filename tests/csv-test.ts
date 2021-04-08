import { assertArrayIncludes } from "https://deno.land/std@0.92.0/testing/asserts.ts"
import { readCSV, writeCSV } from '../csv.ts'

const csvReadPath = './examples/csv/prices.csv'
const csvWritePath = './examples/csv/names.csv'

Deno.test("reads a csv file", async () => {
    const csv = await readCSV(csvReadPath) as ArrayLike<unknown>

    assertArrayIncludes(csv, [[ "One", "500", "$0.5" ]]);
});

Deno.test("reads a csv file without header", async () => {
    const csv = await readCSV(csvReadPath, { 
        skipFirstRow: true
    }) as ArrayLike<unknown>

    assertArrayIncludes(csv, [{ Name: "Two", Amount: "13", Price: "$10" }]);
});

Deno.test("writes a csv file", async () => {
    const data = `name,age\nRick,70\nSmith,14`
    await writeCSV(csvWritePath, data)
    const csv = await readCSV(csvWritePath) as ArrayLike<unknown>

    assertArrayIncludes(csv, [[ "Rick", "70" ]]);
});