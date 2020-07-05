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
