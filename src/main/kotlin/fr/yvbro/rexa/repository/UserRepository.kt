package fr.yvbro.rexa.repository

import fr.yvbro.rexa.jooq.generated.tables.JUser
import fr.yvbro.rexa.model.User
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import java.util.*

@Repository
class UserRepository(private val dsl: DSLContext,
                     private val userTupleMapper: UserTupleMapper) {

    fun getUserByEmail(email: String?): Optional<User>? = dsl.select()
            .from(USER)
            .where(USER.EMAIL.eq(email))
            .limit(1)
            .fetchOptional(userTupleMapper)

    companion object {
        private val USER = JUser.USER
    }
}
