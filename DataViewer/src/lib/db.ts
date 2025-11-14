import Dexie, { type EntityTable} from 'dexie';


interface Timeseries {
    id: number;
    name: string;
    units: string;
};

interface TimeseriesData {
    id: number;
    timeseriesId: number;
    timestamp: Date;
    value: number;
}

export const db = new Dexie('Timeseries Database') as Dexie & {
    series: EntityTable<Timeseries, 'id'>;
    data: EntityTable<TimeseriesData, 'id'>;
};

db.version(1).stores({
    series: '++id, name, units',
    data: '++id, timeseriesId, timestamp, value'
});