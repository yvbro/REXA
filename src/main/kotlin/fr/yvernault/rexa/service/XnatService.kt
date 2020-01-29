package fr.yvernault.rexa.service

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import fr.yvernault.rexa.model.Assessor
import fr.yvernault.rexa.model.Scan
import fr.yvernault.rexa.xnat.XnatClient
import fr.yvernault.rexa.xnat.XnatGlossary
import org.springframework.stereotype.Service

@Service
class XnatService(private val xnatClient: XnatClient) {

    private val mapper = jacksonObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

    fun getScansForProject(projectId: String): List<Scan> {
        val scanUri = "${XnatGlossary.urlArchiveLabel}?project=$projectId${XnatGlossary.scanUrlLabel}"

        return mapper.readValue(xnatClient.callXnatUri(scanUri, projectId))
    }

    fun getAssessorsForProject(projectId: String): List<Assessor> {
        val assessorUri = "${XnatGlossary.urlArchiveLabel}?project=$projectId${XnatGlossary.assessorUrlLabel}"
        //TODO: Add FreeSurfer assessor get

        return mapper.readValue(xnatClient.callXnatUri(assessorUri, projectId))
    }
}
