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
class UserSettingsService(private val xnatRepository: UserSettingsRepository,
                          private val userRepository: UserRepository,
                          private val passwordService: PasswordService,
                          private val securityConfiguration: AESEncryptionDecryption,
                          private val properties: Properties) {

    fun getXnatSettings(userId: UUID?): UserSettings {
        return xnatRepository.getSettingsByUserId(userId)
    }

    fun upsertXnatSettings(userId: UUID?, xnatUsername: String?, xnatHost: String?, xnatPassword: String?) {
        if (xnatPassword != null) {
            xnatRepository.upsert(userId, xnatUsername, xnatHost, securityConfiguration.encrypt(xnatPassword, properties.secret))
        } else {
            throw RexaBadRequestException("You must set the Xnat Password.")
        }
    }

    fun upsertUserSettings(userSettingsRequest: UserSettingsRequest) {
        val userId = (SecurityContextHolder.getContext().authentication.principal as UserPrincipal).id
        val encodedPassword = (SecurityContextHolder.getContext().authentication.principal as UserPrincipal).password

        if (!passwordService.matches(userSettingsRequest.currentPassword, encodedPassword)) {
            throw RexaBadRequestException("You entered a wrong password.")
        }

        userId?.let { userRepository.editPassword(it, passwordService.encodePassword(userSettingsRequest.newPassword)) }
    }

}
