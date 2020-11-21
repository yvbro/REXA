package fr.yvbro.rexa.repository.mapper

import fr.yvbro.rexa.config.Properties
import fr.yvbro.rexa.jooq.generated.Tables
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.security.AESEncryptionDecryption
import org.jooq.Record
import org.jooq.RecordMapper
import org.springframework.stereotype.Component

@Component
class UserSettingsMapper(private val securityConfiguration: AESEncryptionDecryption, private val properties: Properties) : RecordMapper<Record, UserSettings> {
    override fun map(record: Record): UserSettings {
        return UserSettings.Builder()
                .xnatUsername(record.get(Tables.USER_SETTINGS.XNAT_USERNAME))
                .xnatPassword(securityConfiguration.decrypt(record.get(Tables.USER_SETTINGS.XNAT_PASSWORD), properties.secret))
                .xnatHost(record.get(Tables.USER_SETTINGS.XNAT_URL))
                .userId(record.get(Tables.USER_SETTINGS.USER_ID))
                .build()
    }
}
