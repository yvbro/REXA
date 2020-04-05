package fr.yvbro.rexa.exception.common

import com.fasterxml.jackson.annotation.JsonInclude
import java.time.Instant

@JsonInclude(JsonInclude.Include.NON_NULL)
open class ApiErrorBean(open var errorCode: String?, open var message: String?, var field: String? = null, val timeframe: Instant = Instant.now())
