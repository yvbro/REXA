package fr.yvbro.rexa.exception

import com.fasterxml.jackson.annotation.JsonPropertyOrder

@JsonPropertyOrder("timestamp", "errorCode", "field", "message", "errors")
class ApiValidationErrorBean(override var message: String, override var errorCode: String, var errors: List<ValidationError>) : ApiErrorBean(message, errorCode)
