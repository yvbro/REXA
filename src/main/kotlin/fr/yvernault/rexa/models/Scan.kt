package fr.yvernault.rexa.models

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class Scan(
        @JsonProperty("session_ID") var sessionId: String? = "",
        @JsonProperty("ID") var id: String? = "",
        @JsonProperty("subject_label") var subjectLabel: String? = "",
        @JsonProperty("URI") var uri: String? = "",
        @JsonProperty("xnat:imagesessiondata/subject_id") var subjectId: String? = "",
        @JsonProperty("xnat:imagescandata/type") var type: String? = "",
        @JsonProperty("xnat:imagescandata/quality") var quality: String? = "",
        @JsonProperty("xnat:imagescandata/note") var note: String? = "",
        @JsonProperty("xnat:imagescandata/frames") var frames: String? = "",
        @JsonProperty("xnat:imagescandata/series_description") var description: String? = "",
        @JsonProperty("xnat:imagescandata/file/label") var file: String? = "",
        @JsonProperty("label") var sessionLabel: String? = "",
        var date: String? = "",
        var project: String = "",
        var xsiType: String=""
) {
}