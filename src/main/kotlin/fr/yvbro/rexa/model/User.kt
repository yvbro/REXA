package fr.yvbro.rexa.model

import java.util.*

data class User(
        var id: UUID?,
        var email: String?,
        var password: String?,
        var authProvider: String?,
        var userRoles: List<String>
) {
    data class Builder(
            var id: UUID? = null,
            var email: String? = null,
            var password: String? = null,
            var authProvider: String? = null,
            var userRoles: List<String> = listOf("USER")) {
        fun id(id: UUID?) = apply { this.id = id }
        fun email(email: String?) = apply { this.email = email }
        fun password(password: String?) = apply { this.password = password }
        fun authProvider(authProvider: String?) = apply { this.authProvider = authProvider }
        fun userRoles(userRoles: List<String>) = apply { this.userRoles = userRoles }
        fun build() = User(id, email, password, authProvider, userRoles)
    }
}

enum class AuthProvider {
    Local, Google
}
