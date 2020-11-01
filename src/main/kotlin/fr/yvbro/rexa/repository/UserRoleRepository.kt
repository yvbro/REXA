package fr.yvbro.rexa.repository

import fr.yvbro.rexa.jooq.generated.Tables.ROLES
import fr.yvbro.rexa.jooq.generated.Tables.USER_ROLE
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import java.util.*

@Repository
class UserRoleRepository(private val dslContext: DSLContext) {

    fun getRolesForUserId(userId: UUID?): List<String> = dslContext.select()
            .from(ROLES)
            .join(USER_ROLE)
            .on(USER_ROLE.ROLE_ID.eq(ROLES.ID))
            .where(USER_ROLE.USER_ID.eq(userId))
            .fetch(ROLES.NAME)

    fun saveRolesForUser(userId: UUID, userRoles: List<String>) {
        val roles = getRoles();

        val inserts = userRoles.map {userRole -> dslContext.insertInto(USER_ROLE, USER_ROLE.USER_ID, USER_ROLE.ROLE_ID).values(userId, roles[userRole])}
        dslContext.batch(inserts).execute()
    }

    private fun getRoles(): Map<String, UUID> = dslContext.select(ROLES.ID, ROLES.NAME)
            .from(ROLES)
            .fetchMap(ROLES.NAME, ROLES.ID);

    fun getUserRoles(): Map<UUID, List<String>> = dslContext.select()
                .from(USER_ROLE)
                .join(ROLES)
                .on(USER_ROLE.ROLE_ID.eq(ROLES.ID))
                .fetchGroups(USER_ROLE.USER_ID, ROLES.NAME)
}
