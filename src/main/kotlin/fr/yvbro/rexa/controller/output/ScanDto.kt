package fr.yvbro.rexa.controller.output

import fr.yvbro.rexa.model.Scan

data class ScanDto(
    var sessionId: String,
    var id: String,
    var subjectLabel: String?,
    var uri: String,
    var subjectId: String?,
    var scanLabel: String?,
    var type: String,
    var quality: String,
    var note: String,
    var description: String,
    var sessionLabel: String,
    var date: String?,
    var project: String,
    var xsiType: String
) {
    companion object{
        fun from(scan: Scan): ScanDto {
            return ScanDto(
                scan.sessionId,
                scan.id,
                scan.subjectLabel,
                scan.uri,
                scan.subjectId,
                scan.scanLabel,
                scan.type,
                scan.quality,
                scan.note,
                scan.description,
                scan.sessionLabel,
                scan.date,
                scan.project,
                scan.xsiType
            )
        }
    }

}

