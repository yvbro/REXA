package fr.yvbro.rexa.exception.common

import com.fasterxml.jackson.annotation.JsonPropertyOrder

@JsonPropertyOrder("timestamp", "errorCode", "field", "message", "errors")
class ApiValidationErrorBean(override var errorCode: String?, override var message: String?, var errors: MutableList<Any>) : ApiErrorBean(errorCode, message)
