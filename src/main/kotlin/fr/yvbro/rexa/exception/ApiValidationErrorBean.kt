package fr.yvbro.rexa.exception

import com.fasterxml.jackson.annotation.JsonPropertyOrder

@JsonPropertyOrder("timestamp", "errorCode", "field", "message", "errors")
class ApiValidationErrorBean(override var errorCode: String?, override var message: String?, var errors: List<ValidationError>) : ApiErrorBean(errorCode, message)
