const linematch = /((?:[^,](?:\([^\)]*\))*)+)/g;

export function parseCSV(csv: string): { [key: string]: string }[] {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const result: { [key: string]: string }[] = [];
    
    lines.slice(1).forEach(line => {
        const values = [...line.matchAll(linematch)].map(m => m[0].trim() || '');
        let row: { [key: string]: string } = {};
        values.forEach((value, index) => {
            const header = headers[index];
            row[header] = value;
        });
        result.push(row);
    });
    return result;
}
const datetime_re =
    /datetime\.datetime\(\s*(?<year>[0-9]{2,4})(\s*,\s*(?<month>1?[0-9])(\s*,\s*(?<day>[1-3]?[0-9])(\s*,\s*(?<hour>[1-2]?[0-9])(\s*,\s*(?<minute>[1-5]?[0-9])(\s*,\s*(?<second>[1-5]?[0-9])(\s*,\s*(?<microsecond>[0-9]{1,6}))?)?)?)?)?)?\s*\)/;

export function parsePowerFlowCSV(csv: string, options: {keyColumn: string, variableNameColumn?: string , variableValueColumn?: string } = {keyColumn: 'load_id'}): Map<string, { timestamp: Date, [key: string]: any }[]> {
    let parsed = parseCSV(csv);

    console.assert(parsed[0]['timestamp'], 'No timestamp column found');

    let result = new Map<string, { timestamp: Date, [key: string]: any }[]>();
    parsed.forEach(row => {
        let date_str = row['timestamp'];
        let match = date_str.match(datetime_re);

        console.assert(match, `Invalid datetime format: ${date_str}`);

        let { year, month, day, hour, minute, second, microsecond } = match!.groups!;

        let timestamp = new Date(
            parseInt(year),
            month ? parseInt(month) - 1 : 0,
            day ? parseInt(day) : 1,
            hour ? parseInt(hour) : 0,
            minute ? parseInt(minute) : 0,
            // second ? parseInt(second) : 0,
            //microsecond ? Math.floor(parseInt(microsecond) / 1000) : 0
        );

        let t: keyof typeof row;
        let timeEntry: {timestamp: Date, [key:string]: any} = { timestamp };
        let key = undefined;
        for (t in row) {
            if (options.keyColumn && t ===  options.keyColumn) {
                key = row[t];
            } else if (options.variableNameColumn && t === options.variableNameColumn) {
                timeEntry[row[t]] = parseFloat(row[options.variableValueColumn!]);
            } else if (t !== 'timestamp' && t !== options.variableValueColumn) {
                timeEntry[t] = parseFloat(row[t]);
            } 
        }

        if(!result.has(key!)) {
            result.set(key!, []);
        }
        result.get(key!)!.push(timeEntry);
    });

    result.forEach((dataArray, key) => {
        dataArray.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    });

    return result;
};

export function mergeCommercialLoadData(...csvData: Map<string, { timestamp: Date, [key: string]: any }[]>[]): Map<string, { timestamp: Date, [key: string]: any }[]> {
    let mergedData: Map<string, Map<number, { [key: string]: any }>> = new Map();



    csvData.forEach(dataArray => {
        dataArray.forEach((timeseries, key) => {
            if (!mergedData.has(key)) {
                mergedData.set(key, new Map());
            }
            const loadData = mergedData.get(key)!;
            timeseries.forEach(dataPoint => {
                const timestamp = dataPoint.timestamp.getTime();
                let dataPointAtTime = loadData.get(timestamp) || {};
                Object.keys(dataPoint).forEach(k => {
                    if (k !== 'timestamp') {
                        dataPointAtTime[k] = dataPoint[k];
                    }
                });
                loadData.set(timestamp, dataPointAtTime);
            });
        })
    });

    let finalMergedData: Map<string, { timestamp: Date, [key: string]: any }[]> = new Map();

    mergedData.forEach((timeMap, loadId) => {
        let dataArray: { timestamp: Date, [key: string]: any }[] = [];
        timeMap.forEach((dataPoint, timestamp) => {
            dataArray.push({ timestamp: new Date(timestamp), ...dataPoint });
        });
        dataArray.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        finalMergedData.set(loadId, dataArray);
    });
    console.log('Final Merged Data:', finalMergedData);

    return finalMergedData;
}