package fr.yvernault.daxapp.services.scan.impl

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvernault.daxapp.models.Scan
import fr.yvernault.daxapp.services.scan.ScanService
import org.json.JSONArray
import org.json.JSONObject
import org.springframework.stereotype.Service

@Service
object ScanServiceImpl : ScanService {
    override fun get_project_scans(projectId: String): List<Scan>? {
        /*
        List all the scans that you have access to based on passed project.
        
        :param projectid: ID of a project on XNAT
        :return: List of all the scans for the project
        */

        val user = "admin"
        val password = "admin"
        FuelManager.instance.basePath = "http://localhost/REST/projects/$projectId"
        var scanList: List<Scan>? = null

        val httpAsync = "/experiments"
                .httpGet()
                .header(Headers.ACCEPT to "application/json")
                .authentication()
                .basic(user, password)
                .responseString() { request, response, result ->
                    when (result) {
                        is Result.Failure -> {
                            val ex = result.getException()
                            println(ex)
                        }
                        is Result.Success -> {
                            val data = result.get()
                            val mapper = jacksonObjectMapper()
                            val dataJson = jsonFormat(data)
                            scanList = mapper.readValue(dataJson.toString())
                        }
                    }
                }

        httpAsync.join()

        return scanList
    }

    fun jsonFormat(json: String): JSONArray {
        val answer = JSONObject(json)
        return answer.optJSONObject("ResultSet").optJSONArray("Result")
    }
}