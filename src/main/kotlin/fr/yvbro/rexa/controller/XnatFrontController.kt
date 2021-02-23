package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig
import fr.yvbro.rexa.controller.input.XnatSettingsRequest
import fr.yvbro.rexa.controller.output.ProjectDto
import fr.yvbro.rexa.controller.output.ProjectPreAchivesDto
import fr.yvbro.rexa.controller.output.ProjectRecentActivitiesDto
import fr.yvbro.rexa.controller.output.XnatInfoDto
import fr.yvbro.rexa.model.Project
import fr.yvbro.rexa.model.role.ADMIN
import fr.yvbro.rexa.model.role.USER
import fr.yvbro.rexa.service.XnatService
import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.*
import java.util.stream.Collectors.toList

@RestController
@RequestMapping(WebConfig.FRONT_CONTEXT_PATH)
@Secured(ADMIN, USER)
class XnatFrontController(private val xnatService: XnatService) {

    @GetMapping("/projects/{id}")
    fun getXnatProjectInfo(@PathVariable id: String): XnatInfoDto {

        val scans = xnatService.getScansForProject(id)
        val assessors = xnatService.getAssessorsForProject(id)

        return XnatInfoDto(
            id,
            scans.size,
            scans.groupBy { it.sessionLabel }.size,
            scans.groupBy { it.subjectLabel }.size,
            scans,
            assessors
        )
    }

    @GetMapping("/projects")
    fun getXnatProjects(): List<ProjectDto> {
        return xnatService.getProjects()
            .stream()
            .map(this::mapToDto)
            .collect(toList())
    }

    @GetMapping("/recentActivities")
    fun getXnatRecentActivities(): List<ProjectRecentActivitiesDto> {
        return xnatService.getRecentActivities()
            .take(4)  // need pagination
            .map { it.toOutput() }
    }

    @GetMapping("/preArchives")
    fun getXnatPreArchives(): List<ProjectPreAchivesDto> {
        return xnatService.getPreArchive()
            .take(4)  // need pagination
            .map { it.toOutput() }
    }

    @PostMapping("/test")
    fun testCredentials(@RequestBody xnatSettingsRequest: XnatSettingsRequest) {
        xnatService.testConnection(xnatSettingsRequest)
    }

    private fun mapToDto(project: Project): ProjectDto {
        return ProjectDto(project.name, project.id, project.description, project.piFirstname, project.piLastname)
    }

}

