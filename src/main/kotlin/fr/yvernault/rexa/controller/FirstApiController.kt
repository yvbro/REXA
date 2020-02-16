package fr.yvernault.rexa.controller

import fr.yvernault.rexa.DTO.XnatInfoDTO
import fr.yvernault.rexa.service.XnatService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class FirstApiController(private val xnatService: XnatService) {

    @GetMapping("/projects/{id}")
    fun getXnatInfo(@PathVariable id: String): XnatInfoDTO {

        val scans = xnatService.getScansForProject(id)
        val assessors = xnatService.getAssessorsForProject(id)

        return XnatInfoDTO(
                scans.size,
                scans.groupBy { it.sessionLabel }.size,
                scans.groupBy { it.subjectLabel }.size,
                scans,
                assessors)
    }

}

