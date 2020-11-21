package fr.yvbro.rexa.service

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class PasswordService(private val passwordEncoder: PasswordEncoder) {

    @Transactional(readOnly = true)
    fun encodePassword(unencodedPassword: String?): String {
        return passwordEncoder.encode(unencodedPassword)
    }

    companion object {
        const val MIN_PASSWORD_LENGTH = 8
    }
}
