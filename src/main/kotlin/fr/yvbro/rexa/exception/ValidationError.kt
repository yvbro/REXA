package fr.yvbro.rexa.exception

import com.fasterxml.jackson.annotation.JsonPropertyOrder

@JsonPropertyOrder("field", "message")
class ValidationError(val field: String, val message: String) {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ValidationError

        if (field != other.field) return false
        if (message != other.message) return false

        return true
    }

    override fun hashCode(): Int {
        var result = field.hashCode()
        result = 31 * result + message.hashCode()
        return result
    }

    override fun toString(): String {
        return "ValidationErrorBean(field='$field', message='$message')"
    }

}
