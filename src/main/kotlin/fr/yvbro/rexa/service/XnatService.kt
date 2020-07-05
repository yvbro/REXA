package fr.yvbro.rexa.service

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import fr.yvbro.rexa.controller.input.UserSettingsRequest
import fr.yvbro.rexa.model.Assessor
import fr.yvbro.rexa.model.Project
import fr.yvbro.rexa.model.Scan
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.xnat.XnatClient
import fr.yvbro.rexa.xnat.XnatGlossary
import org.springframework.stereotype.Service

@Service
class XnatService(private val xnatClient: XnatClient) {

    private val mapper = jacksonObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

    fun getProjects(): List<Project> {
        return mapper.readValue(xnatClient.callXnatUri(XnatGlossary.urlProjectLabel))
    }

    fun getScansForProject(projectId: String): List<Scan> {
        val scanUri = "${XnatGlossary.urlArchiveLabel}?project=$projectId${XnatGlossary.scanUrlLabel}"

        return mapper.readValue(xnatClient.callXnatUri(scanUri))
    }

    fun getAssessorsForProject(projectId: String): List<Assessor> {
        val assessorUri = "${XnatGlossary.urlArchiveLabel}?project=$projectId${XnatGlossary.assessorUrlLabel}"
        //TODO: Add FreeSurfer assessor get

        return mapper.readValue(xnatClient.callXnatUri(assessorUri))
    }

    fun testConnection(userSettingsRequest: UserSettingsRequest) {
        val fullUri = userSettingsRequest.xnatHost + XnatGlossary.urlProjectLabel
        xnatClient.callXnatUriWithCredentials(fullUri, UserSettings(userSettingsRequest.xnatUsername, userSettingsRequest.xnatPassword, userSettingsRequest.xnatHost, null));
    }

}
