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
        const procFound = arr.filter(
            (el) => el.name === obj['proc:genprocdata/proctype']
        );
        if (procFound.length > 0) {
            procFound[0].data[
                PROC_STATUS.indexOf(obj['proc:genprocdata/procstatus'])
            ] += 1;
        } else {
            arr.push({
                name: obj['proc:genprocdata/proctype'],
                data: [...defaultProcStatus(obj['proc:genprocdata/procstatus'])],
            });
        }
        return arr;
    }, []);
};

export const extractUnusableScanTypes = (scans) => {
    return scans.filter(
            (scan) => scan['xnat:imagescandata/quality'] === UNUSABLE_SCAN_QUALITY
        ).reduce((arr, obj) => {
        const typeFound = arr.filter(
            (el) => el.name === obj['xnat:imagescandata/type']
        );
        if (typeFound.length > 0) {
            typeFound[0] += 1;
        } else {
            arr.push({
                name: obj['xnat:imagescandata/type'],
                data: 1,
            });
        }
        return arr;
    }, []);
};
