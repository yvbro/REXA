package fr.yvernault.rexa.controller

import fr.yvernault.daxapp.services.scan.impl.AssessorService
import fr.yvernault.daxapp.services.scan.impl.ScanService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class FirstApiController {

    @GetMapping("/greeting")
    fun greeting(@RequestParam(value = "name", defaultValue = "World") name: String) = "Hello, $name"

    @GetMapping("/projects/{id}")
    fun getXnatInfo(@PathVariable id: String){

        /*
        Get all the project informations

        :param id: ID of a project on XNAT
        :return: Json we differents information in the project
         */

        val scansProject = ScanService.get_project_scans(id)

        // Number of scan
        val nbScans = scansProject?.size

        // Number of Session
        val nbSession = scansProject?.groupBy { it.sessionLabel }?.size

        // Number of Subject
        val nbSubject = scansProject?.groupBy { it.subjectLabel }?.size

        // Dico of scan by type
        val dicoScanByType = scansProject?.groupBy { it.type }

        println("Scans : $nbScans")
        println("Sessions : $nbSession")
        println("Subject : $nbSubject")
        dicoScanByType?.forEach {
            k, v ->
            println("$k = ${v.size}")
        }

        val assessorList = AssessorService.get_project_assessors(id)

        val dicoAssessorByType = assessorList?.groupBy { it.type }

        dicoAssessorByType?.forEach{
            k, v ->
            println("$k = ${v.size}")
        }


    }

}
