package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig
import fr.yvbro.rexa.controller.input.UserSettingsRequest
import fr.yvbro.rexa.controller.output.ProjectDto
import fr.yvbro.rexa.controller.output.ProjectPreAchivesDto
import fr.yvbro.rexa.controller.output.ProjectRecentActivitiesDto
import fr.yvbro.rexa.controller.output.XnatInfoDto
import fr.yvbro.rexa.model.Project
import fr.yvbro.rexa.model.ProjectPreArchive
import fr.yvbro.rexa.model.ProjectRecentActivities
import fr.yvbro.rexa.service.XnatService
import org.springframework.web.bind.annotation.*
import java.util.stream.Collectors.toList

@RestController
@RequestMapping(WebConfig.FRONT_CONTEXT_PATH)
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
                assessors)
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
                .stream()
                .map(this::mapToDtoRecentActivities)
                .collect(toList())
    }

    @GetMapping("/preArchives")
    fun getXnatPreArchives(): List<ProjectPreAchivesDto> {
        return xnatService.getPreArchive()
                .stream()
                .map(this::mapToDtoPreAchive)
                .collect(toList())
    }

    @PostMapping("/test")
    fun testCredentials(@RequestBody userSettingsRequest: UserSettingsRequest) {
        xnatService.testConnection(userSettingsRequest)
    }

    private fun mapToDto(project: Project): ProjectDto {
        return ProjectDto(project.name, project.id, project.description, project.piFirstname, project.piLastname)
    }

    private fun mapToDtoRecentActivities(projectRecentActivities: ProjectRecentActivities): ProjectRecentActivitiesDto {
        return ProjectRecentActivitiesDto(
                projectRecentActivities.workflowStatus,
                projectRecentActivities.project,
                projectRecentActivities.actionDate.toString(),
                projectRecentActivities.label,
                projectRecentActivities.typeDesc,
                projectRecentActivities.elementName,
                projectRecentActivities.id)
    }

    private fun mapToDtoPreAchive(projectPreArchive: ProjectPreArchive): ProjectPreAchivesDto {
        return ProjectPreAchivesDto(
                projectPreArchive.subject,
                projectPreArchive.project,
                projectPreArchive.session,
                projectPreArchive.scanDate.toString(),
                projectPreArchive.updloadDate.toString(),
                projectPreArchive.status)
    }


}

