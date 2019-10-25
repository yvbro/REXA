package fr.yvernault.daxapp.services.scan.impl

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvernault.rexa.models.Scan
import fr.yvernault.rexa.services.jsonFormat
import org.springframework.stereotype.Service

@Service
object ScanService {
    fun get_project_scans(projectId: String): List<Scan>? {
        /*
        List all the experiments that you have access to based on passed project.
        
        :param projectid: ID of a project on XNAT
        :return: List of all the scans for the project
        */

        val user = "admin"
        val password = "admin"
        FuelManager.instance.basePath = "http://localhost/REST/archive/experiments?project=$projectId&xsiType=xnat:imageSessionData&columns=ID," +
                "URI,label,subject_label,project,xnat:imagesessiondata/subject_id,nat:imagescandata/" +
                "id,xnat:imagescandata/type,xnat:imagescandata/quality,xnat:imagescandata/" +
                "note,xnat:imagescandata/frames,xnat:imagescandata/series_description,xnat:imagescandata/file/label"
        var sessionList: List<Scan>? = null

        val httpAsync = ""
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
                            val mapper = jacksonObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                            val dataJson = jsonFormat(data)
                            sessionList = mapper.readValue(dataJson.toString())
                        }
                    }
                }

        httpAsync.join()

        return sessionList
    }


}