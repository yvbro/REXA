package fr.yvernault.daxapp.services.scan.impl

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.kittinunf.fuel.core.FuelManager
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.authentication
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result
import fr.yvernault.rexa.models.Assessor
import fr.yvernault.rexa.services.jsonFormat
import org.springframework.stereotype.Service

@Service
object AssessorService {
    fun get_project_assessors(projectId: String): List<Assessor>? {
        /*
            List all the assessors that you have access to based on passed project.
            :param projectid: ID of a project on XNAT
            :return: List of all the assessors for the project
        */

        // Assessor datatypes
        val DEFAULT_FS_DATATYPE = "fs:fsData"
        val DEFAULT_DATATYPE = "proc:genProcData"

        val user = "admin"
        val password = "admin"

        FuelManager.instance.basePath = "http://localhost/REST/archive/experiments?project=$projectId&xsiType=$DEFAULT_FS_DATATYPE&columns=ID,label,URI,xsiType,project,xnat:imagesessiondata/subject_id,subject_label,xnat:imagesessiondata/id,xnat:imagesessiondata/label,URI,$DEFAULT_FS_DATATYPE/procstatus,$DEFAULT_FS_DATATYPE/validation/status,$DEFAULT_FS_DATATYPE/procversion,$DEFAULT_FS_DATATYPE/jobstartdate,$DEFAULT_FS_DATATYPE/memused,$DEFAULT_FS_DATATYPE/walltimeused,$DEFAULT_FS_DATATYPE/jobid,$DEFAULT_FS_DATATYPE/jobnode,fstype%7D/out/file/label"

        var assessorList: MutableList<Assessor>? = null

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
                            assessorList = mapper.readValue(dataJson.toString())
                        }
                    }
                }

        httpAsync.join()

        FuelManager.instance.basePath ="http://localhost/REST/archive/experiments?project=$projectId&xsiType=$DEFAULT_DATATYPE&columns=ID,label,URI,xsiType,project,xnat:imagesessiondata/subject_id,xnat:imagesessiondata/id,xnat:imagesessiondata/label,$DEFAULT_DATATYPE/procstatus,$DEFAULT_DATATYPE/proctype,$DEFAULT_DATATYPE/validation/status,$DEFAULT_DATATYPE/procversion,$DEFAULT_DATATYPE/jobstartdate,$DEFAULT_DATATYPE/memused,$DEFAULT_DATATYPE/walltimeused,$DEFAULT_DATATYPE/jobid,$DEFAULT_DATATYPE/jobnode,$DEFAULT_DATATYPE/inputs,$DEFAULT_DATATYPE/out/file/label"

        val httpAsyncProc = ""
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

                            assessorList?.addAll(mapper.readValue(dataJson.toString())!!)
                        }
                    }
                }

        httpAsyncProc.join()

        return assessorList
    }
}

