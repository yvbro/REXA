import { Assessor } from './Assessor';
import { Scan } from './Scan';

export type ProjectXnat = {
    projectId: number;
    numberOfScan: number;
    numberOfSession: number;
    numberOfSubject: number;
    scans: Scan[];
    assessors: Assessor[];
};
