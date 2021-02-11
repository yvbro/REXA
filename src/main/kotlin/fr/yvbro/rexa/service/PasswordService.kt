package fr.yvbro.rexa.service

import fr.yvbro.rexa.exception.RexaBadRequestException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class PasswordService(private val passwordEncoder: PasswordEncoder) {

    @Transactional(readOnly = true)
    fun encodePassword(unencodedPassword: String?): String {
        return passwordEncoder.encode(unencodedPassword)
    }

    @Transactional(readOnly = true)
    fun matches(rawPassword: String, encodedPassword: String?): Boolean {
        return passwordEncoder.matches(rawPassword, encodedPassword)
    }

    @Transactional(readOnly = true)
    fun checkPasswordRules(password: String) {
        if (password.length < MIN_PASSWORD_LENGTH) {
            throw RexaBadRequestException("Password must be at least 8 characters long.")
        } else if (!CONTAINS_ONE_CAPITAL.matches(password)) {
            throw RexaBadRequestException("Password must contain a capital letter.")
        } else if (!CONTAINS_ONE_NUMBER.matches(password)) {
            throw RexaBadRequestException("Password must contain a number.")
        }
    }

    companion object {
        const val MIN_PASSWORD_LENGTH = 8
        val CONTAINS_ONE_CAPITAL = "^.*[A-Z]+.*$".toRegex()
        val CONTAINS_ONE_NUMBER = "^.*[0-9]+.*$".toRegex()
    }
}
