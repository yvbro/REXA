package fr.yvbro.rexa.xnat

class XnatGlossary {
    companion object {
        const val defaultAssessorTypeLabel: String = "proc:genprocdata"
        const val defaultAssessorFsTypeLabel: String = "fs:fsData"
        const val assessorStatusLabel: String = "procstatus"
        const val assessorTypeLabel: String = "proctype"
        const val defaultScanTypeLabel: String = "xnat:imagescandata"
        const val urlArchiveLabel: String = "/REST/archive/experiments"

        const val assessorUrlLabel: String = "&xsiType=$defaultAssessorTypeLabel&columns=ID,label,URI,xsiType,project,xnat:imagesessiondata/subject_id," +
                "xnat:imagesessiondata/id,xnat:imagesessiondata/label,$defaultAssessorTypeLabel/procstatus,$defaultAssessorTypeLabel/" +
                "proctype,$defaultAssessorTypeLabel/validation/status,$defaultAssessorTypeLabel/procversion,$defaultAssessorTypeLabel/jobstartdate," +
                "$defaultAssessorTypeLabel/memused,$defaultAssessorTypeLabel/walltimeused,$defaultAssessorTypeLabel/jobid,$defaultAssessorTypeLabel/jobnode," +
                "$defaultAssessorTypeLabel/inputs,$defaultAssessorTypeLabel/out/file/label"

        const val scanUrlLabel: String = "&xsiType=xnat:imageSessionData&columns=ID," +
                "URI,label,subject_label,project,xnat:imagesessiondata/subject_id,nat:imagescandata/" +
                "id,$defaultScanTypeLabel/type,$defaultScanTypeLabel/quality,$defaultScanTypeLabel/" +
                "note,$defaultScanTypeLabel/frames,$defaultScanTypeLabel/series_description,$defaultScanTypeLabel/file/label"

        const val assessorFsUrlLabel: String = "&xsiType=$defaultAssessorFsTypeLabel&columns=ID,label,URI,xsiType,project,xnat:imagesessiondata/" +
                "subject_id,subject_label,xnat:imagesessiondata/id,xnat:imagesessiondata/label,URI,$defaultAssessorFsTypeLabel/" +
                "procstatus,$defaultAssessorFsTypeLabel/validation/status,$defaultAssessorFsTypeLabel/procversion,$defaultAssessorFsTypeLabel/" +
                "jobstartdate,$defaultAssessorFsTypeLabel/memused,$defaultAssessorFsTypeLabel/walltimeused,$defaultAssessorFsTypeLabel/jobid," +
                "$defaultAssessorFsTypeLabel/jobnode,fstype%7D/out/file/label"
    }
}

