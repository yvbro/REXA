package fr.yvbro.rexa.xnat

import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.exception.RexaNotFoundException
import fr.yvbro.rexa.exception.RexaUnknownException
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.security.UserPrincipal
import fr.yvbro.rexa.service.UserSettingsService
import fr.yvbro.rexa.xnat.exception.UnknownXnatHostException
import fr.yvbro.rexa.xnat.exception.XnatUnauthorizedException
import org.json.JSONArray
import org.json.JSONObject
import org.slf4j.LoggerFactory
import org.springframework.http.MediaType
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class XnatClient(private val userSettingsService: UserSettingsService) {

    companion object {
        private val logger = LoggerFactory.getLogger(XnatClient::class.java)
    }

    fun callXnatUri(uri: String): String {
        val xnatSettingsForUser = userSettingsService.getXnatSettings((SecurityContextHolder.getContext().authentication.principal as UserPrincipal).id)
        if (xnatSettingsForUser.xnatHost == null) {
            throw RexaNotFoundException("Xnat settings")
        }
        val fullUri = xnatSettingsForUser.xnatHost + uri

        logger.info("Fetching Xnat data with URI $uri")
        return callXnatUriWithCredentials(fullUri, xnatSettingsForUser)
    }

    fun callXnatUriWithCredentials(uri: String, userSettings: UserSettings): String {

        var statusCode = 200
        var errorMessage: String? = ""

        var data = ""

        val httpAsync = uri
                .httpGet()
                .header(Headers.ACCEPT to MediaType.APPLICATION_JSON)
                .authentication()
                .basic(userSettings.xnatUsername!!, userSettings.xnatPassword!!)
                .responseString { _, _, result ->
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
            -1 -> {
                throw UnknownXnatHostException()
            }
            200 -> {
                return data
            }
            400 -> {
                throw RexaBadRequestException(errorMessage)
            }
            401 -> {
                throw XnatUnauthorizedException()
            }
            else -> {
                throw RexaUnknownException()
            }
        }

    }

    fun jsonFormat(json: String): JSONArray {
        val answer = JSONObject(json)
        return answer.optJSONObject("ResultSet").optJSONArray("Result")
    }

}
