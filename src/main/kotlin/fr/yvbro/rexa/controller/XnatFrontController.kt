package fr.yvbro.rexa.controller

import fr.yvbro.rexa.controller.output.ProjectDto
import fr.yvbro.rexa.controller.output.XnatInfoDto
import fr.yvbro.rexa.model.Project
import fr.yvbro.rexa.service.XnatService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.stream.Collectors.toList

@RestController
class XnatFrontController(private val xnatService: XnatService) {

    @GetMapping("/projects/{id}")
    fun getXnatProjectInfo(@PathVariable id: String): XnatInfoDto {

        val scans = xnatService.getScansForProject(id)
        val assessors = xnatService.getAssessorsForProject(id)

        return XnatInfoDto(
                scans.size,
                scans.groupBy { it.sessionLabel }.size,
                scans.groupBy { it.subjectLabel }.size,
                scans,
                assessors)
    }

    @GetMapping("/projects")
    fun getXnatProjects(): List<ProjectDto> {

        val projects = xnatService.getProjects()

        return projects
                .stream()
                .map(this::mapToDto)
                .collect(toList())
    }

    private fun mapToDto(project: Project): ProjectDto {
        return ProjectDto(project.name, project.id, project.description, project.piFirstname, project.piLastname)
    }
}

