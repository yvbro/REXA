package fr.yvbro.rexa.DTO

import fr.yvbro.rexa.model.Assessor
import fr.yvbro.rexa.model.Scan

data class  XnatInfoDTO(
        var numberOfScan: Int,
        var numberOfSession: Int,
        var numberOfSubject: Int,
        var scans: List<Scan>,
        var assessors: List<Assessor>
) {
}
