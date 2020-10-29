package fr.yvbro.rexa.model

import fr.yvbro.rexa.controller.output.UserDto
import java.util.*

data class User(
        var id: UUID?,
        var email: String?,
        var password: String?,
        var authProvider: String?,
        var userRoles: List<String>,
        var enabled: Boolean?
) {
    data class Builder(
            var id: UUID? = null,
            var email: String? = null,
            var password: String? = null,
            var authProvider: String? = null,
            var userRoles: List<String> = listOf("USER"),
            var enabled: Boolean? = false) {
        fun id(id: UUID?) = apply { this.id = id }
        fun email(email: String?) = apply { this.email = email }
        fun password(password: String?) = apply { this.password = password }
        fun authProvider(authProvider: String?) = apply { this.authProvider = authProvider }
        fun userRoles(userRoles: List<String>) = apply { this.userRoles = userRoles }
        fun enabled(enabled: Boolean?) = apply { this.enabled = enabled }
        fun build() = User(id, email, password, authProvider, userRoles, enabled)
    }

    fun toOutput(): UserDto = UserDto(
            this.email,
            this.userRoles,
            this.enabled)
}

enum class AuthProvider {
    Local, Google
}
