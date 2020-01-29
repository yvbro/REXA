package fr.yvernault.rexa.xnat

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvernault.rexa.exception.RexaException
import fr.yvernault.rexa.xnat.XnatGlossary
import fr.yvernault.rexa.model.Assessor
import fr.yvernault.rexa.model.Scan
import fr.yvernault.rexa.model.XnatProperties
import fr.yvernault.rexa.service.jsonFormat
import org.json.JSONArray
import org.slf4j.LoggerFactory
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.http.MediaType
import org.springframework.stereotype.Service

@Service
@EnableConfigurationProperties(XnatProperties::class)
class XnatClient(private val properties: XnatProperties) {

    private val logger = LoggerFactory.getLogger(XnatClient::class.java)

    init {
        FuelManager.instance.basePath = properties.url
    }

    fun callXnatUri(uri: String, projectId: String): String {

        val user = properties.user
        val password = properties.password
        var data: String = ""

        val httpAsync = uri
                .httpGet()
                .header(Headers.ACCEPT to MediaType.APPLICATION_JSON)
                .authentication()
                .basic(user, password)
                .responseString() { request, response, result ->
                    when (result) {
                        is Result.Failure -> {
                            val ex = result.getException()
                            logger.error(ex.message)
                            throw RexaException(ex.message)
                        }
                        is Result.Success -> {
                            val dataJson = result.get()
                            data = jsonFormat(dataJson).toString()
                        }
                    }
                }
        httpAsync.join()

        return data
    }
}
