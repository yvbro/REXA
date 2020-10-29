package fr.yvbro.rexa.controller.output

data class ProjectRecentActivitiesDto(var workflowStatus: String,
                                      var project: String,
                                      var actionDate: String,
                                      var label: String,
                                      var typeDesc: String,
                                      var elementName: String,
                                      var id: String)
