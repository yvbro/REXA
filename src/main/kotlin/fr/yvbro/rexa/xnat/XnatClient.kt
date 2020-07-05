package fr.yvbro.rexa.xnat

import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.exception.RexaUnknownException
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.security.UserPrincipal
import fr.yvbro.rexa.service.UserSettingsService
import fr.yvbro.rexa.xnat.exception.XnatUnauthorizedException
import org.json.JSONArray
import org.json.JSONObject
import org.slf4j.LoggerFactory
import org.springframework.http.MediaType
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class XnatClient(private val properties: XnatProperties, private val userSettingsService: UserSettingsService) {

    private val logger = LoggerFactory.getLogger(XnatClient::class.java)

    fun callXnatUri(uri: String): String {
        val user = userSettingsService.getXnatSettings((SecurityContextHolder.getContext().authentication.principal as UserPrincipal).id)
        var fullUri = user.xnatHost + uri

        return callXnatUriWithCredentials(fullUri, user)
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

    fun jsonFormat(json: String): JSONArray {
        val answer = JSONObject(json)
        return answer.optJSONObject("ResultSet").optJSONArray("Result")
    }

}
