package fr.yvbro.rexa.xnat

class XnatGlossary {
    companion object {
        const val defaultAssessorTypeLabel: String = "proc:genprocdata"
        const val defaultAssessorFsTypeLabel: String = "fs:fsData"
        const val assessorStatusLabel: String = "procstatus"
        const val assessorTypeLabel: String = "proctype"
        const val defaultScanTypeLabel: String = "xnat:imagescandata"
        const val urlArchiveLabel: String = "/REST/archive/experiments"
        const val urlProjectLabel: String = "/REST/projects"

        const val assessorUrlLabel: String = "&xsiType=$defaultAssessorTypeLabel&columns=ID,label,URI,xsiType,project,xnat:imagesessiondata/subject_id," +
                "xnat:imagesessiondata/id,xnat:imagesessiondata/label,$defaultAssessorTypeLabel/procstatus,$defaultAssessorTypeLabel/" +
                "proctype,$defaultAssessorTypeLabel/validation/status,$defaultAssessorTypeLabel/procversion"

        const val scanUrlLabel: String = "&xsiType=xnat:imageSessionData&columns=ID," +
                "URI,label,subject_label,project,xnat:imagesessiondata/subject_id,xnat:imagescandata/" +
                "id,$defaultScanTypeLabel/type,$defaultScanTypeLabel/quality,$defaultScanTypeLabel/" +
                "note,$defaultScanTypeLabel/frames,$defaultScanTypeLabel/series_description"

        const val assessorFsUrlLabel: String = "&xsiType=$defaultAssessorFsTypeLabel&columns=ID,label,URI,xsiType,project,xnat:imagesessiondata/" +
                "subject_id,subject_label,xnat:imagesessiondata/id,xnat:imagesessiondata/label,URI,$defaultAssessorFsTypeLabel/" +
                "procstatus,$defaultAssessorFsTypeLabel/validation/status,$defaultAssessorFsTypeLabel/procversion,$defaultAssessorFsTypeLabel/" +
                "jobstartdate,$defaultAssessorFsTypeLabel/memused,$defaultAssessorFsTypeLabel/walltimeused,$defaultAssessorFsTypeLabel/jobid," +
                "$defaultAssessorFsTypeLabel/jobnode,fstype%7D/out/file/label"
    }
}

