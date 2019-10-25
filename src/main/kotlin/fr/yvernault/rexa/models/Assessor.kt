package fr.yvernault.rexa.models

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class Assessor(
        @JsonProperty("ID") var id: String? = "",
        @JsonProperty("insert_date") var insertDate: String? = "",
        @JsonProperty("URI") var uri: String? = "",
        @JsonProperty("session_ID") var sessionId: String? = "",
        @JsonProperty("proc:genprocdata/procstatus") var procStatus: String? = "",
        @JsonProperty("proc:genprocdata/proctype") var type: String? = "",
        @JsonProperty("proc:genprocdata/validation/status") var statusValidation: String? = "",
        var project: String? = "",
        var xsiType: String="",
        var label: String = ""
) {

}