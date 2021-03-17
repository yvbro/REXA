package fr.yvbro.rexa.service;

import fr.yvbro.rexa.exception.RexaBadRequestException
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.password.PasswordEncoder
import kotlin.test.assertFailsWith

@SpringBootTest
class PasswordServiceTest {

    @InjectMocks
    lateinit var passwordService: PasswordService

    @Mock
    lateinit var passwordEncoder: PasswordEncoder

    @Test
    fun `checkPasswordRules throws an exception if password is too short`() {
        assertFailsWith<RexaBadRequestException>(message = "Password must be at least 8 characters long.") {
            passwordService.checkPasswordRules("passwor")
        }
    }

    @Test
    fun `checkPasswordRules throws an exception if password does not contain a capital letter`() {
        assertFailsWith<RexaBadRequestException>(message = "Password must contain a capital letter.") {
            passwordService.checkPasswordRules("password")
        }
    }

    @Test
    fun `checkPasswordRules throws an exception if password does not contain a number`() {
        assertFailsWith<RexaBadRequestException>(message = "Password must contain a number.") {
            passwordService.checkPasswordRules("Password")
        }
    }

    @Test
    fun `checkConfirmationPassword throws an exception if password and confirmation password don't match`() {
        assertFailsWith<RexaBadRequestException>(message = "Password and confirmation does not match.") {
            passwordService.checkConfirmationPassword("Password", "password")
        }
    }

    @Test
    fun `checkConfirmationPassword does nothing if password and confirmation password match`() {
        assertDoesNotThrow { passwordService.checkConfirmationPassword("Password", "Password") }
    }

    @Test
    fun `checkCurrentPassword throws an exception if password and current password don't match`() {
        Mockito.`when`(passwordEncoder.matches("Password", "password")).thenReturn(false)
        assertFailsWith<RexaBadRequestException>(message = "Password and confirmation does not match.") {
            passwordService.checkCurrentPassword("Password", "password")
        }
    }

    @Test
    fun `checkCurrentPassword does nothing if password and current password match`() {
        Mockito.`when`(passwordEncoder.matches("Password", "Password")).thenReturn(true)
        assertDoesNotThrow { passwordService.checkCurrentPassword("Password", "Password") }
    }
}
