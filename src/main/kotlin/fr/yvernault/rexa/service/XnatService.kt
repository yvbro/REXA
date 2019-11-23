package fr.yvernault.rexa.service

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvernault.rexa.XnatGlossary
import fr.yvernault.rexa.model.Assessor
import fr.yvernault.rexa.model.Scan
import fr.yvernault.rexa.model.XnatProperties
import org.slf4j.LoggerFactory
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.http.MediaType
import org.springframework.stereotype.Service

@Service
@EnableConfigurationProperties(XnatProperties::class)
class XnatService(private val properties: XnatProperties) {

    private val logger = LoggerFactory.getLogger(XnatService::class.java)

    init {
        FuelManager.instance.basePath = properties.url
    }

    fun getScansForProject(projectId: String): List<Scan> {

        val user = properties.user
        val password = properties.password

        var sessionList: List<Scan> = emptyList()

        val httpAsync = "${XnatGlossary.urlArchiveLabel}?project=$projectId${XnatGlossary.scanUrlLabel}"
                .httpGet()
                .header(Headers.ACCEPT to MediaType.APPLICATION_JSON)
                .authentication()
                .basic(user, password)
                .responseString() { request, response, result ->
                    when (result) {
                        is Result.Failure -> {
                            val ex = result.getException()
                            logger.error(ex.message)
                        }
                        is Result.Success -> {
                            val data = result.get()
                            val mapper = jacksonObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                            val dataJson = jsonFormat(data)
                            sessionList = mapper.readValue(dataJson.toString())
                        }
                    }
                }

        httpAsync.join()

        return sessionList
    }

    fun getAssessorsForProject(projectId: String): List<Assessor>? {

        val user = properties.user
        val password = properties.password

        var assessorList: MutableList<Assessor>? = null

        val httpAsync = "${XnatGlossary.urlArchiveLabel}?project=$projectId${XnatGlossary.assessorFsUrlLabel}"
                .httpGet()
                .header(Headers.ACCEPT to MediaType.APPLICATION_JSON)
                .authentication()
                .basic(user, password)
                .responseString() { request, response, result ->
                    when (result) {
                        is Result.Failure -> {
                            val ex = result.getException()
                            logger.error(ex.message)
                        }
                        is Result.Success -> {
                            val data = result.get()
                            val mapper = jacksonObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                            val dataJson = jsonFormat(data)
                            assessorList = mapper.readValue(dataJson.toString())
                        }
                    }
                }

        httpAsync.join()

        val httpAsyncProc = "${XnatGlossary.urlArchiveLabel}?project=$projectId${XnatGlossary.assessorUrlLabel}"
                .httpGet()
                .header(Headers.ACCEPT to MediaType.APPLICATION_JSON)
                .authentication()
                .basic(user, password)
                .responseString() { request, response, result ->
                    when (result) {
                        is Result.Failure -> {
                            val ex = result.getException()
                            logger.error(ex.message)
                        }
                        is Result.Success -> {
                            val data = result.get()
                            val mapper = jacksonObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                            val dataJson = jsonFormat(data)
                            assessorList?.addAll(mapper.readValue(dataJson.toString()))
                        }
                    }
                }

        httpAsyncProc.join()

        return assessorList
    }
}
