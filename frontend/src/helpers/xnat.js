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

const defaultProcStatus = (status) => {
    return PROC_STATUS.reduce(function (result, s) {
        result.push(s === status ? 1 : 0);
        return result;
    }, []);
};

export const extractAssessorsProcTypeAndStatus = (assessors) => {
    return assessors.reduce((arr, obj) => {
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

export const getUnknownProcStatus = (assessors) => {
    return [
        ...new Set(
            assessors
                .filter(
                    (proc) =>
                        !PROC_STATUS.includes(proc['proc:genprocdata/procstatus'])
                )
                .map((proc) => proc['proc:genprocdata/procstatus'])
        ),
    ];
};

export const extractScanTypes = (scans) => {
    return scans.reduce((arr, obj) => {
        const typeFound = arr.filter(
            (el) => el.name === obj['xnat:imagescandata/type']
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

export const getUnusableScans = (scans) => {
    let idsProcessed = [];
    return scans.filter((scan) => {
        if (scan['xnat:imagescandata/quality'] === UNUSABLE_SCAN_QUALITY) {
            const uniqueId = `${scan.ID}.${scan['xnat:imagescandata/id']}`;
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

export const getXnatUri = (host, id) =>
    `${host}/app/action/DisplayItemAction/search_element/xnat:mrSessionData/search_field/xnat:mrSessionData.ID/search_value/${id}`;
