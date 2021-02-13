package fr.yvbro.rexa.service

import fr.yvbro.rexa.exception.RexaBadRequestException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class PasswordService(private val passwordEncoder: PasswordEncoder) {

    fun encodePassword(unencodedPassword: String?): String {
        return passwordEncoder.encode(unencodedPassword)
    }

    fun matches(rawPassword: String, encodedPassword: String?): Boolean {
        return passwordEncoder.matches(rawPassword, encodedPassword)
    }

    fun checkPasswordRules(password: String) {
        if (password.length < MIN_PASSWORD_LENGTH) {
            throw RexaBadRequestException("Password must be at least 8 characters long.")
        } else if (!CONTAINS_ONE_CAPITAL.matches(password)) {
            throw RexaBadRequestException("Password must contain a capital letter.")
        } else if (!CONTAINS_ONE_NUMBER.matches(password)) {
            throw RexaBadRequestException("Password must contain a number.")
        }
    }

    fun checkConfirmationPassword(newPassword: Any, confirmationPassword: Any) {
        if (confirmationPassword != newPassword) {
            throw RexaBadRequestException("Password and confirmation does not match.")
        }
    }

    fun checkCurrentPassword(currentPassword: String, encodedPassword: String?) {
        if (!matches(currentPassword, encodedPassword)) {
            throw RexaBadRequestException("The current password is not valid.")
        }
    }

    companion object {
        const val MIN_PASSWORD_LENGTH = 8
        val CONTAINS_ONE_CAPITAL = "^.*[A-Z]+.*$".toRegex()
        val CONTAINS_ONE_NUMBER = "^.*[0-9]+.*$".toRegex()
    }
}
