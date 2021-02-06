package fr.yvbro.rexa.service

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import fr.yvbro.rexa.controller.input.XnatSettingsRequest
import fr.yvbro.rexa.model.*
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

        return mapper.readValue(xnatClient.callXnatUri(assessorUri))
    }

    fun getRecentActivities(): List<ProjectRecentActivities> {
        return mapper.readValue(xnatClient.callXnatUri(XnatGlossary.urlRecentActivities))
    }

    fun getPreArchive(): List<ProjectPreArchive> {
        return mapper.readValue(xnatClient.callXnatUri(XnatGlossary.urlPreArchive))
    }

    fun testConnection(xnatSettingsRequest: XnatSettingsRequest) {
        val fullUri = xnatSettingsRequest.xnatHost + XnatGlossary.urlProjectLabel
        xnatClient.callXnatUriWithCredentials(fullUri, UserSettings(xnatSettingsRequest.xnatUsername, xnatSettingsRequest.xnatPassword, xnatSettingsRequest.xnatHost, null))
    }

}
