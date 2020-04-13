package fr.yvbro.rexa.model

data class User(
        var email: String?,
        var password: String?
) {

    data class Builder(
            var email: String? = null,
            var password: String? = null) {
        fun email(email: String?) = apply { this.email = email }
        fun password(password: String?) = apply { this.password = password }
        fun build() = User(email, password)

    }

}
