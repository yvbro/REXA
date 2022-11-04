import { Assessor } from '../models/project/Assessor';
import { Scan } from '../models/project/Scan';
import { ScanByType } from './type/ScanByType';
import { ProcessorStats } from './type/ProcessorStats';

export const PROC_STATUS = [
    'NEED_INPUTS',
    'NEED_TO_RUN',
    'JOB_RUNNING',
    'JOB_FAILED',
    'READY_TO_UPLOAD',
    'UPLOADING',
    'READY_TO_COMPLETE',
    'COMPLETE',
    'NO_DATA',
    'UNKNOWN',
];

export const UNUSABLE_SCAN_QUALITY = 'unusable';

const defaultProcStatus = (status: string) => {
    return PROC_STATUS.reduce((result: number[], s) => {
        result.push(s === status ? 1 : 0);
        return result;
    }, []);
};

export const extractAssessorsProcTypeAndStatus = (assessors: Assessor[]) => {
    return assessors.reduce((arr: ProcessorStats[], obj) => {
        const procStatus = PROC_STATUS.includes(obj.procStatus)
            ? obj.procStatus
            : 'UNKNOWN';

        const procFound = arr.filter((el) => el.name === obj.procType);

        if (procFound.length > 0) {
            procFound[0].data[PROC_STATUS.indexOf(procStatus)] += 1;
        } else {
            arr.push({
                name: obj.procType,
                data: [...defaultProcStatus(procStatus)],
            });
        }
        return arr;
    }, []);
};

export const getUnknownProcStatus = (assessors: Assessor[]) => {
    return [
        ...new Set(
            assessors
                .filter((proc) => !PROC_STATUS.includes(proc.procStatus))
                .map((proc) => proc.procStatus)
        ),
    ];
};

export const extractScanTypes = (scans: Scan[]) => {
    return scans.reduce((arr: ScanByType[], obj: Scan) => {
        const typeFound = arr.filter((el) => el.name === obj.type);
        if (typeFound.length > 0) {
            typeFound[0].data += 1;
        } else {
            arr.push({
                name: obj.type,
                data: 1,
            });
        }
        return arr;
    }, []);
};

export const getUnusableScans = (scans: Scan[]) => {
    const idsProcessed: string[] = [];
    return scans.filter((scan) => {
        if (scan.quality === UNUSABLE_SCAN_QUALITY) {
            const uniqueId = `${scan.id}.${scan.scanLabel}`;
            if (idsProcessed.includes(uniqueId)) {
                return false;
            }
            idsProcessed.push(uniqueId);
            return true;
        }
        return false;
    });
};

export const getXnatUri = (host: string, id: number) =>
    `${host}/app/action/DisplayItemAction/search_element/xnat:mrSessionData/search_field/xnat:mrSessionData.ID/search_value/${id}`;
