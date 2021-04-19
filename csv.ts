import { parse, ParseOptions } from 'https://deno.land/std@0.92.0/encoding/csv.ts'
import { DataItem, stringify } from 'https://deno.land/std@0.92.0/encoding/csv.ts';

export async function readCSV(path: string, options?: ParseOptions): Promise<Record<string, unknown>[]> {
    if (!options || !('skipFirstRow' in options)) {
        // to force library to be consistent and return an array of objects
        options = { 
            ...options,
            skipFirstRow: true
        }
    }

    const raw = await Deno.readTextFile(path)
    const content = await parse(raw, options)
    return content as Record<string, unknown>[]
}

export async function writeCSV(path: string, data: Record<string, unknown>[] | string) {
    if (typeof data === 'string') {
        await Deno.writeTextFile(path, data);
        return
    }

    const headers = Object.keys(data[0])
    // we have to stringify the data with a row header
    const dataString = await stringify(data as DataItem[], headers)

    await Deno.writeTextFile(path, dataString);
}