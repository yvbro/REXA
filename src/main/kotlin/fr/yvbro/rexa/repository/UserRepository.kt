package fr.yvbro.rexa.repository

import fr.yvbro.rexa.controller.output.UserDto
import fr.yvbro.rexa.jooq.generated.Tables.USER
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.repository.mapper.UserTupleMapper
import org.jooq.DSLContext
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.security.core.userdetails.UsernameNotFoundException
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
            .orElseThrow { UsernameNotFoundException("User not found with email : $email") }

    fun findUserByEmail(email: String): Optional<User> = dsl.select()
            .from(USER)
            .where(USER.EMAIL.eq(email))
            .limit(1)
            .fetchOptional(userTupleMapper)

    fun save(email: String, password: String, authProvider: String, enabled: Boolean): User {
        val record = dsl.insertInto(USER, USER.ID, USER.EMAIL, USER.PASSWORD, USER.AUTH_PROVIDER, USER.ENABLED)
                .values(UUID.randomUUID(), email, password, authProvider, enabled)
                .returningResult(USER.ID, USER.EMAIL, USER.PASSWORD, USER.AUTH_PROVIDER, USER.ENABLED)
                .fetchOne()
        return userTupleMapper.map(record)
    }

    fun editPassword(userEmail: String, password: String): Int = dsl.update(USER)
                .set(USER.PASSWORD, password)
                .where(USER.EMAIL.eq(userEmail))
                .execute()

    fun switchEnabledForUser(userEmail: String, enabled: Boolean): Int = dsl.update(USER)
                .set(USER.ENABLED, enabled)
                .where(USER.EMAIL.eq(userEmail))
                .execute()

    fun getUserById(id: UUID?): User = dsl.select()
            .from(USER)
            .where(USER.ID.eq(id))
            .limit(1)
            .fetchOptional(userTupleMapper)
            .orElseThrow { UsernameNotFoundException("User not found with id : $id") }

    fun getUsers(): List<User> = dsl.select()
            .from(USER)
            .fetch(userTupleMapper)

    fun getUsersByPage(pageable: Pageable): Page<User> {
        val users = dsl.select()
                .from(USER).offset(pageable.offset).limit(pageable.pageSize).fetch(userTupleMapper);

        return PageImpl(users, pageable, getNumberOfUser().toLong())
    }

    fun getNumberOfUser() : Int = dsl.select().from(USER).count()
}
