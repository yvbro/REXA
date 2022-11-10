package fr.yvbro.rexa.controller.output

import com.fasterxml.jackson.annotation.JsonProperty
import fr.yvbro.rexa.model.Assessor
import fr.yvbro.rexa.model.Scan
import fr.yvbro.rexa.xnat.XnatGlossary

data class AssessorDto(
    val sessionId: String,
    val id: String,
    val insertedDate: String?,
    val uri: String,
    val procStatus: String,
    val procType: String,
    val qaStatus: String,
    val project: String,
    val xsiType: String,
    val label: String
){
    companion object{
        fun from(assessor: Assessor): AssessorDto {
            return AssessorDto(
                assessor.sessionId,
                assessor.id,
                assessor.insertedDate,
                assessor.uri,
                assessor.procStatus,
                assessor.procType,
                assessor.qaStatus,
                assessor.project,
                assessor.xsiType,
                assessor.label
            )
        }
    }

}

