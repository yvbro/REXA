package fr.yvbro.rexa.xnat

import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvbro.rexa.service.jsonFormat
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

        val user = properties.user
        val password = properties.password
        var data: String = ""

        val httpAsync = uri
                .httpGet()
                .header(Headers.ACCEPT to MediaType.APPLICATION_JSON)
                .authentication()
                .basic(user, password)
                .responseString() { _, _, result ->
                    when (result) {
                        is Result.Failure -> {
                            val ex = result.getException()
                            logger.error(ex.message)
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
