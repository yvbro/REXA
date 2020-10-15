package fr.yvbro.rexa.controller.output

data class AuthResponse(val name: String, val roles: Set<String>, val accessToken: String, val tokenType: String = "Bearer")
