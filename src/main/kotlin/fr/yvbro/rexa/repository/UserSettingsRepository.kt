package fr.yvbro.rexa.repository

import fr.yvbro.rexa.jooq.generated.Tables.USER_SETTINGS
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.repository.mapper.UserSettingsMapper
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import java.util.*

@Repository
class UserSettingsRepository(private val dsl: DSLContext,
                             private val userSettingsMapper: UserSettingsMapper) {

    fun getSettingsByUserId(userId: UUID?): UserSettings = dsl.select()
            .from(USER_SETTINGS)
            .where(USER_SETTINGS.USER_ID.eq(userId))
            .limit(1)
            .fetchOptional(userSettingsMapper)
            .orElse(UserSettings(null, null, null, null))

    fun upsert(userId: UUID?, xnatUsername: String?, xnatHost: String?, xnatPassword: String?) {
        dsl.insertInto(USER_SETTINGS)
                .set(USER_SETTINGS.USER_ID, userId)
                .set(USER_SETTINGS.XNAT_USERNAME, xnatUsername)
                .set(USER_SETTINGS.XNAT_URL, xnatHost)
                .set(USER_SETTINGS.XNAT_PASSWORD, xnatPassword)
                .onDuplicateKeyUpdate()
                .set(USER_SETTINGS.XNAT_USERNAME, xnatUsername)
                .set(USER_SETTINGS.XNAT_URL, xnatHost)
                .set(USER_SETTINGS.XNAT_PASSWORD, xnatPassword)
                .where(USER_SETTINGS.USER_ID.eq(userId))
                .execute()
    }
}
