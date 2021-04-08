import * as aq from "https://cdn.skypack.dev/arquero";

let t = await aq.fromCSV(await Deno.readTextFile("./examples/csv/flights.csv"));

t = t
  .derive({
    // convert the JSON duration representation into seconds
    // input: {hours: 1, minutes: 2, seconds: 3}
    // output: 3723
    duration: (d: any) => {
      const parsed = aq.op.parse_json(d.duration);
      return (
        (parsed.days ?? 0) * 24 * 60 * 60 +
        (parsed.hours ?? 0) * 60 * 60 +
        (parsed.minutes ?? 0) * 60 +
        (parsed.seconds ?? 0)
      )
    },
    // convert the date from Unix millis to ISO8601
    day: (d: any) => aq.op.format_utcdate(d.day, true),
  })
  // Sort rows by duration, descreasing
  .orderby(aq.desc("duration"));

await Deno.writeTextFile("./examples/flights2.csv", t.toCSV());
