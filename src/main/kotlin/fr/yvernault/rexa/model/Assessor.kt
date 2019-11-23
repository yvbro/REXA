package fr.yvernault.rexa.model

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import fr.yvernault.rexa.XnatGlossary

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class Assessor(
        @JsonProperty("ID") val id: String,
        @JsonProperty("insert_date") val insertDate: String?,
        @JsonProperty("URI") val uri: String,
        @JsonProperty("session_ID") val sessionId: String,
        @JsonProperty(XnatGlossary.defaultAssessorTypeLabel+ "/" + XnatGlossary.assessorStatusLabel) val procStatus: String,
        @JsonProperty(XnatGlossary.defaultAssessorTypeLabel + "/" + XnatGlossary.assessorTypeLabel) val type: String,
        @JsonProperty(XnatGlossary.defaultAssessorTypeLabel + "/validation/status") val qaStatus: String,
        val project: String,
        val xsiType: String,
        val label: String
) {

}
