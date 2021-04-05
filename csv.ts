import { parse, ParseOptions } from 'https://deno.land/std@0.92.0/encoding/csv.ts'

export async function loadCSV(path: string, options?: ParseOptions): Promise<unknown> {
    const raw = await Deno.readTextFile(path)
    const content = await parse(raw, options)
    return content
}

export async function writeCSV(path: string, data: string) {
    await Deno.writeTextFile(path, data);
}