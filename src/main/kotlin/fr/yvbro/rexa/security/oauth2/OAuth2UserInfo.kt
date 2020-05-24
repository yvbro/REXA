package fr.yvbro.rexa.security.oauth2

class OAuth2UserInfo(var attributes: Map<String, Any>) {

    fun getId(): String {
        return attributes["sub"].toString()
    }

    fun getName(): String {
        return attributes["name"].toString()
    }

    fun getEmail(): String {
        return attributes["email"].toString()
    }
}
