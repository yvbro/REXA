package fr.yvbro.rexa.repository

import fr.yvbro.rexa.exception.RexaAuthentificationFailedException
import fr.yvbro.rexa.jooq.generated.Tables.USER
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.repository.mapper.UserTupleMapper
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import java.util.*

@Repository
class UserRepository(private val dsl: DSLContext,
                     private val userTupleMapper: UserTupleMapper) {

    fun getUserByEmail(email: String): User = dsl.select()
            .from(USER)
            .where(USER.EMAIL.eq(email))
            .limit(1)
            .fetchOptional(userTupleMapper)
            .orElseThrow { RexaAuthentificationFailedException() }

    fun save(email: String, password: String) {
        dsl.insertInto(USER, USER.ID, USER.EMAIL, USER.PASSWORD)
                .values(UUID.randomUUID(), email, password)
                .execute()
    }
}
