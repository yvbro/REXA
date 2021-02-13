package fr.yvbro.rexa.controller.input

data class UserChangePasswordRequest(var email: String, var newPassword: String, var confirmationPassword: String)
