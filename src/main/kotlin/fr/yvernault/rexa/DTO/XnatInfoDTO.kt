package fr.yvernault.rexa.DTO

import fr.yvernault.rexa.model.Assessor
import fr.yvernault.rexa.model.Scan

data class  XnatInfoDTO(
        var numberOfScan: Int,
        var numberOfSession: Int,
        var numberOfSubject: Int,
        var scans: List<Scan>,
        var assessors: List<Assessor>?
) {
}
