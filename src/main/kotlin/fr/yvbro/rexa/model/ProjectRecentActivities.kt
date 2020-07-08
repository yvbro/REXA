package fr.yvbro.rexa.model

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import java.util.*

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class ProjectRecentActivities(
        @JsonProperty("workflow_status") var workflowStatus: String,
        @JsonProperty("action_date")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss.SSS")
        var actionDate: Date,
        @JsonProperty("type_desc") var typeDesc: String,
        @JsonProperty("element_name") var elementName: String,
        var project: String,
        var label: String,
        var id: String)
