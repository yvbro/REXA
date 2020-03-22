package fr.yvbro.rexa.exception

import com.fasterxml.jackson.annotation.JsonPropertyOrder
import java.time.Instant

@JsonPropertyOrder("timestamp", "errorCode", "field", "message")
open class ApiErrorBean(open var message: String, open var errorCode: String, var field: String? = null) {
    private var timeframe: Instant = Instant.now()
}
