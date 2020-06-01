package fr.yvbro.rexa.model

import java.util.*

data class UserSettings(
        var xnat_username: String?,
        var xnat_password: String?,
        var xnat_url: String?,
        var user_id: UUID?
){
    data class Builder(
            var xnat_username: String? = null,
            var xnat_password: String? = null,
            var xnat_url: String? = null,
            var user_id: UUID? = null)
             {
        fun xnat_username(xnat_username: String?) = apply { this.xnat_username = xnat_username }
        fun xnat_password(xnat_password: String?) = apply { this.xnat_password = xnat_password }
        fun xnat_url(xnat_url: String?) = apply { this.xnat_url = xnat_url }
        fun user_id(user_id: UUID?) = apply { this.user_id = user_id }
        fun build() = UserSettings(xnat_username, xnat_password, xnat_url, user_id)
    }
}
