package fr.yvbro.rexa.controller

import fr.yvbro.rexa.controller.output.XnatInfoDto
import fr.yvbro.rexa.service.XnatService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class FirstApiController(private val xnatService: XnatService) {

    @GetMapping("/projects/{id}")
    fun getXnatInfo(@PathVariable id: String): XnatInfoDto {

        val scans = xnatService.getScansForProject(id)
        val assessors = xnatService.getAssessorsForProject(id)

        return XnatInfoDto(
                scans.size,
                scans.groupBy { it.sessionLabel }.size,
                scans.groupBy { it.subjectLabel }.size,
                scans,
                assessors)
    }

}

