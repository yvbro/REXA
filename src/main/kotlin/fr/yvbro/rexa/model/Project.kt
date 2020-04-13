package fr.yvbro.rexa.model

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class Project(var name: String,
                   @JsonProperty("ID") var id: String,
                   var description: String,
                   @JsonProperty("pi_firstname") var piFirstname: String,
                   @JsonProperty("pi_lastname") var piLastname: String)
