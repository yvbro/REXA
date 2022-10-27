import { Scan } from '../models/project/Scan';

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
    return PROC_STATUS.reduce(function (result: number[], s) {
        result.push(s === status ? 1 : 0);
        return result;
    }, []);
};

export const extractAssessorsProcTypeAndStatus = (assessors: any) => {
    return assessors.reduce((arr: any[], obj: any) => {
        const procStatus = PROC_STATUS.includes(obj['proc:genprocdata/procstatus'])
            ? obj['proc:genprocdata/procstatus']
            : 'UNKNOWN';

        const procFound = arr.filter(
            (el) => el.name === obj['proc:genprocdata/proctype']
        );
        if (procFound.length > 0) {
            procFound[0].data[PROC_STATUS.indexOf(procStatus)] += 1;
        } else {
            arr.push({
                name: obj['proc:genprocdata/proctype'],
                data: [...defaultProcStatus(procStatus)],
            });
        }
        return arr;
    }, []);
};

export const getUnknownProcStatus = (assessors: any) => {
    return [
        ...new Set(
            assessors
                .filter(
                    (proc: any) =>
                        !PROC_STATUS.includes(proc['proc:genprocdata/procstatus'])
                )
                .map((proc: any) => proc['proc:genprocdata/procstatus'])
        ),
    ];
};

export const extractScanTypes = (scans: any) => {
    return scans.reduce((arr: any[], obj: any) => {
        const typeFound = arr.filter(
            (el: any) => el.name === obj['xnat:imagescandata/type']
        );
        if (typeFound.length > 0) {
            typeFound[0].data += 1;
        } else {
            arr.push({
                name: obj['xnat:imagescandata/type'],
                data: 1,
            });
        }
        return arr;
    }, []);
};

export const getUnusableScans = (scans: Scan[]) => {
    let idsProcessed: string[] = [];
    return scans.filter((scan) => {
        if (
            scan['xnat:imagescandata/quality' as keyof Scan] ===
            UNUSABLE_SCAN_QUALITY
        ) {
            const uniqueId = `${scan.ID}.${
                scan['xnat:imagescandata/id' as keyof Scan]
            }`;
            if (idsProcessed.includes(uniqueId)) {
                return false;
            } else {
                idsProcessed.push(uniqueId);
                return true;
            }
        } else {
            return false;
        }
    });
};

export const getXnatUri = (host: string, id: number) =>
    `${host}/app/action/DisplayItemAction/search_element/xnat:mrSessionData/search_field/xnat:mrSessionData.ID/search_value/${id}`;
