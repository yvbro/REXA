package fr.yvbro.rexa.controller.output

data class AuthResponse(val token: String, val tokenType: String = "Bearer")
