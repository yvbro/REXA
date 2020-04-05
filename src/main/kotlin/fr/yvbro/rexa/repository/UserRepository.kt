package fr.yvbro.rexa.repository

import fr.yvbro.rexa.exception.RexaAuthentificationFailedException
import fr.yvbro.rexa.exception.RexaNotFoundException
import fr.yvbro.rexa.jooq.generated.tables.JUser
import fr.yvbro.rexa.model.User
import org.jooq.DSLContext
import org.jooq.exception.NoDataFoundException
import org.springframework.stereotype.Repository
import java.util.*

@Repository
class UserRepository(private val dsl: DSLContext,
                     private val userTupleMapper: UserTupleMapper) {

    fun getUserByEmail(user: User?): User? = dsl.select()
            .from(USER)
            .where(USER.EMAIL.eq(user?.email))
            .limit(1)
            .fetchOptional(userTupleMapper)
            .orElseThrow { RexaAuthentificationFailedException() }


    companion object {
        private val USER = JUser.USER
    }
}
