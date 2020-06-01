package fr.yvbro.rexa.repository.mapper

import fr.yvbro.rexa.jooq.generated.Tables
import fr.yvbro.rexa.model.UserSettings
import org.jooq.Record
import org.jooq.RecordMapper
import org.springframework.stereotype.Component

@Component
class UserSettingsMapper : RecordMapper<Record, UserSettings> {
    override fun map(record: Record?): UserSettings {
        return UserSettings.Builder()
                .xnat_username(record?.get(Tables.USER_SETTINGS.XNAT_USERNAME))
                .xnat_password(record?.get(Tables.USER_SETTINGS.XNAT_PASSWORD))
                .xnat_url(record?.get(Tables.USER_SETTINGS.XNAT_URL))
                .user_id(record?.get(Tables.USER_SETTINGS.USER_ID))
                .build()
    }
}
