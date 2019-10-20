package fr.yvernault.daxapp.services.scan

import fr.yvernault.daxapp.models.Scan

interface ScanService {

    fun get_project_scans(projectId: String): List<Scan>?
}