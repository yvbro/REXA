package fr.yvbro.rexa.model

import java.util.*

data class UserSettings(
        var xnatUsername: String?,
        var xnatPassword: String?,
        var xnatHost: String?,
        var userId: UUID?
){
    data class Builder(
            var xnatUsername: String? = null,
            var xnatPassword: String? = null,
            var xnatHost: String? = null,
            var userId: UUID? = null)
             {
        fun xnatUsername(xnatUsername: String?) = apply { this.xnatUsername = xnatUsername }
        fun xnatPassword(xnatPassword: String?) = apply { this.xnatPassword = xnatPassword }
        fun xnatHost(xnatHost: String?) = apply { this.xnatHost = xnatHost }
        fun userId(userId: UUID?) = apply { this.userId = userId }
        fun build() = UserSettings(xnatUsername, xnatPassword, xnatHost, userId)
    }
}
