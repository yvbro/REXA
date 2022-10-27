package fr.yvbro.rexa.model

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import fr.yvbro.rexa.xnat.XnatGlossary

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class Scan(
        @JsonProperty("session_ID") var sessionId: String,
        @JsonProperty("ID") var id: String,
        @JsonProperty("subject_label") var subjectLabel: String?,
        @JsonProperty("URI") var uri: String,
        @JsonProperty(XnatGlossary.defaultScanTypeLabel + "/subject_id") var subjectId: String?,
        @JsonProperty(XnatGlossary.defaultScanTypeLabel + "/id") var scanLabel: String?,
        @JsonProperty(XnatGlossary.defaultScanTypeLabel + "/type") var type: String,
        @JsonProperty(XnatGlossary.defaultScanTypeLabel + "/quality") var quality: String,
        @JsonProperty(XnatGlossary.defaultScanTypeLabel + "/note") var note: String,
        @JsonProperty(XnatGlossary.defaultScanTypeLabel + "/series_description") var description: String,
        @JsonProperty("label") var sessionLabel: String,
        var date: String?,
        var project: String,
        var xsiType: String
)

