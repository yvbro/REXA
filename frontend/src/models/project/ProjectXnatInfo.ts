import { Assessor } from './Assessor';
import { Scan } from './Scan';

export type ProjectXnatInfo = {
    projectId: string;
    numberOfScan: number;
    numberOfSession: number;
    numberOfSubject: number;
    scans: Scan[];
    assessors: Assessor[];
};
