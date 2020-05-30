package fr.yvbro.rexa.controller.output

data class AuthResponse(val accessToken: String, val tokenType: String = "Bearer")
