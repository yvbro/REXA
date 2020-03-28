package fr.yvbro.rexa.xnat

import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.exception.RexaUnknownException
import fr.yvbro.rexa.service.jsonFormat
import fr.yvbro.rexa.xnat.exception.XnatUnauthorizedException
import org.slf4j.LoggerFactory
import org.springframework.http.MediaType
import org.springframework.stereotype.Service

@Service
class XnatClient(private val properties: XnatProperties) {

    private val logger = LoggerFactory.getLogger(XnatClient::class.java)

    init {
        FuelManager.instance.basePath = properties.url
    }

    fun callXnatUri(uri: String, projectId: String): String {

        var statusCode = 200
        var errorMessage: String? = ""

        val user = properties.user
        val password = properties.password
        var data = ""

        val httpAsync = uri
                .httpGet()
                .header(Headers.ACCEPT to MediaType.APPLICATION_JSON)
                .authentication()
                .basic(user, password)
                .responseString() { _, _, result ->
                    when (result) {
                        is Result.Failure -> {
                            val ex = result.getException()
                            errorMessage = ex.message
                            statusCode = ex.response.statusCode
                        }
                        is Result.Success -> {
                            val dataJson = result.get()
                            data = jsonFormat(dataJson).toString()
                        }
                    }
                }
        httpAsync.join()

        when (statusCode) {
            400 -> {
                throw RexaBadRequestException(errorMessage)
            }
            401 -> {
                throw XnatUnauthorizedException()
            }
            500 -> {
                logger.error(errorMessage)
                throw RexaUnknownException()
            }
        }

        return data
    }
}
