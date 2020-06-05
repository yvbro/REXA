package fr.yvbro.rexa.repository

import fr.yvbro.rexa.jooq.generated.Tables
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.repository.mapper.UserSettingsMapper
import org.jooq.DSLContext
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Repository
import java.util.*

@Repository
class UserSettingsRepository(private val dsl: DSLContext,
                             private val xnatSettingsMapper: UserSettingsMapper) {

    fun getSettingsByUserId(userId: UUID?): UserSettings = dsl.select()
            .from(Tables.USER_SETTINGS)
            .where(Tables.USER_SETTINGS.USER_ID.eq(userId))
            .limit(1)
            .fetchOptional(xnatSettingsMapper)
            .orElseThrow { UsernameNotFoundException("Settings not found") }

    fun save(userId: UUID?, xnatUsername: String?, xnatHost: String?) {
        dsl.update(Tables.USER_SETTINGS)
                .set(Tables.USER_SETTINGS.XNAT_USERNAME, xnatUsername)
                .set(Tables.USER_SETTINGS.XNAT_URL, xnatHost)
                .where(Tables.USER_SETTINGS.USER_ID.eq(userId))
                .execute()
    }
}
