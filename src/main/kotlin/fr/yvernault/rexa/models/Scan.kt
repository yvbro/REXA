package fr.yvernault.daxapp.models

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class Scan(
        @JsonProperty("ID") var id: String? = "",
        @JsonProperty("xsiType") var type: String = "",
        @JsonProperty("insert_date") var insertDate: String = "",
        @JsonProperty("URI") var uri: String? = "",
        @JsonProperty("xnat:subjectassessordata/id") var subjectId: String? = "",
        var date: String? = "",
        var project: String = "",
        var label: String =""
)