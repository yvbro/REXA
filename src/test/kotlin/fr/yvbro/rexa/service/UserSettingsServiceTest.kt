package fr.yvbro.rexa.service;

import fr.yvbro.rexa.config.Properties
import fr.yvbro.rexa.controller.input.UserSettingsRequest
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.repository.UserSettingsRepository
import fr.yvbro.rexa.security.AESEncryptionDecryption
import fr.yvbro.rexa.security.UserPrincipal
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.anyString
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import java.util.*
import kotlin.test.assertFailsWith

@SpringBootTest
class UserSettingsServiceTest {

    @InjectMocks
    lateinit var userSettingsService: UserSettingsService

    @Mock
    lateinit var userSettingsRepository: UserSettingsRepository

    @Mock
    lateinit var userRepository: UserRepository

    @Mock
    lateinit var passwordService: PasswordService

    @Mock
    lateinit var securityConfiguration: AESEncryptionDecryption

    @Mock
    lateinit var properties: Properties

    @Test
    fun `upsertXnatSettings should encrypt password before upserting`() {
        Mockito.`when`(properties.secret).thenReturn("test")

        var userId = UUID.randomUUID()
        var xnatUsername = "test"
        var xnatPassword = "password"
        var xnatHost = "http://test.com"
        userSettingsService.upsertXnatSettings(userId, xnatUsername, xnatHost, xnatPassword)

        Mockito.verify(securityConfiguration, Mockito.times(1)).encrypt(xnatPassword, "test")
        Mockito.verify(userSettingsRepository, Mockito.times(1)).upsert(userId, xnatUsername, xnatHost, xnatPassword)
    }

    @Test
    fun `upsertXnatSettings throw an exception if xnatPassword is null`() {
        Mockito.`when`(properties.secret).thenReturn("test")
        assertFailsWith<RexaBadRequestException>("You must set the Xnat Password.") {
            userSettingsService.upsertXnatSettings(UUID.randomUUID(), "test", "http://test.com", null)
        }
    }

    @Test
    fun `upsertUserSettings should verify the data`() {
        val request = UserSettingsRequest("currentPassword1", "Password1", "Password2")

        val user = UserPrincipal(UUID.randomUUID(), "test@gmail.com", "Password1", emptyList(), null, null, null, null)
        val authentication = Mockito.mock(Authentication::class.java)
        Mockito.`when`(authentication.principal).thenReturn(user)
        val securityContext: SecurityContext = Mockito.mock(SecurityContext::class.java)
        Mockito.`when`(securityContext.authentication).thenReturn(authentication)
        SecurityContextHolder.setContext(securityContext)

        userSettingsService.upsertUserSettings(request)

        Mockito.verify(passwordService, Mockito.times(1)).checkConfirmationPassword(request.newPassword, request.confirmationPassword)
        Mockito.verify(passwordService, Mockito.times(1)).checkPasswordRules(request.newPassword)
        Mockito.verify(passwordService, Mockito.times(1)).checkCurrentPassword(request.currentPassword, "Password1")
    }

    @Test
    fun `upsertUserSettings should encode password before upserting`() {
        val request = UserSettingsRequest("currentPassword1", "Password1", "Password2")

        val user = UserPrincipal(UUID.randomUUID(), "test@gmail.com", "Password1", emptyList(), null, null, null, null)
        val authentication = Mockito.mock(Authentication::class.java)
        Mockito.`when`(authentication.principal).thenReturn(user)
        val securityContext: SecurityContext = Mockito.mock(SecurityContext::class.java)
        Mockito.`when`(securityContext.authentication).thenReturn(authentication)
        SecurityContextHolder.setContext(securityContext)

        Mockito.`when`(passwordService.encodePassword(request.newPassword)).thenReturn("passwordEncoded")

        userSettingsService.upsertUserSettings(request)

        Mockito.verify(passwordService, Mockito.times(1)).encodePassword(request.newPassword)
        Mockito.verify(userRepository, Mockito.times(1)).editPassword("test@gmail.com", "passwordEncoded")
    }

}
