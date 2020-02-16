package fr.yvernault.rexa.model

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import fr.yvernault.rexa.xnat.XnatGlossary

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class Assessor(
        @JsonProperty("session_ID") val sessionId: String,
        @JsonProperty("ID") val id: String,
        @JsonProperty("insert_date") val insertedDate: String?,
        @JsonProperty("URI") val uri: String,
        @JsonProperty(XnatGlossary.defaultAssessorTypeLabel+ "/" + XnatGlossary.assessorStatusLabel) val procStatus: String,
        @JsonProperty(XnatGlossary.defaultAssessorTypeLabel + "/" + XnatGlossary.assessorTypeLabel) val procType: String,
        @JsonProperty(XnatGlossary.defaultAssessorTypeLabel + "/validation/status") val qaStatus: String,
        val project: String,
        val xsiType: String,
        val label: String
) {

}
