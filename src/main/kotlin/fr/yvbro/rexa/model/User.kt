package fr.yvbro.rexa.model

import java.util.*

data class User(
        var id: UUID?,
        var email: String?,
        var password: String?
) {
    data class Builder(
            var id: UUID? = null,
            var email: String? = null,
            var password: String? = null) {
        fun id(id: UUID?) = apply { this.id = id }
        fun email(email: String?) = apply { this.email = email }
        fun password(password: String?) = apply { this.password = password }
        fun build() = User(id, email, password)
    }
}
