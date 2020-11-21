package fr.yvbro.rexa.service

import fr.yvbro.rexa.config.Properties
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.repository.UserSettingsRepository
import fr.yvbro.rexa.security.AESEncryptionDecryption
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserSettingsService(private val xnatRepository: UserSettingsRepository,
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

}
