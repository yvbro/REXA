package fr.yvbro.rexa.service

import fr.yvbro.rexa.config.Properties
import fr.yvbro.rexa.controller.input.UserSettingsRequest
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.repository.UserSettingsRepository
import fr.yvbro.rexa.security.AESEncryptionDecryption
import fr.yvbro.rexa.security.UserPrincipal
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserSettingsService(private val userSettingsRepository: UserSettingsRepository,
                          private val userRepository: UserRepository,
                          private val passwordService: PasswordService,
                          private val securityConfiguration: AESEncryptionDecryption,
                          private val properties: Properties) {

    fun getXnatSettings(userId: UUID?): UserSettings {
        return userSettingsRepository.getSettingsByUserId(userId)
    }

    fun upsertXnatSettings(userId: UUID?, xnatUsername: String?, xnatHost: String?, xnatPassword: String?) {
        if (xnatPassword != null) {
            userSettingsRepository.upsert(userId, xnatUsername, xnatHost, securityConfiguration.encrypt(xnatPassword, properties.secret))
        } else {
            throw RexaBadRequestException("You must set the Xnat Password.")
        }
    }

    fun upsertUserSettings(userSettingsRequest: UserSettingsRequest) {
        val email = (SecurityContextHolder.getContext().authentication.principal as UserPrincipal).username
        val encodedPassword = (SecurityContextHolder.getContext().authentication.principal as UserPrincipal).password

        passwordService.checkConfirmationPassword(userSettingsRequest.newPassword, userSettingsRequest.confirmationPassword)
        passwordService.checkPasswordRules(userSettingsRequest.newPassword)

        passwordService.checkCurrentPassword(userSettingsRequest.currentPassword, encodedPassword)

        email?.let { userRepository.editPassword(it, passwordService.encodePassword(userSettingsRequest.newPassword)) }
    }
}
