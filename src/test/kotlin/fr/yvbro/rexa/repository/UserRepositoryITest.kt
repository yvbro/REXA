package fr.yvbro.rexa.repository;

import fr.yvbro.rexa.config.AbstractTestConfiguration
import fr.yvbro.rexa.jooq.generated.Tables.USER
import fr.yvbro.rexa.model.User
import org.assertj.core.api.Assertions.assertThat
import org.flywaydb.core.Flyway
import org.jooq.DSLContext
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UsernameNotFoundException
import java.util.*
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class UserRepositoryITest : AbstractTestConfiguration() {

    val USER_ID: UUID = UUID.fromString("059ed9d4-5f21-4483-9960-fd7a8bba79b2")
    val USER_ID2: UUID = UUID.fromString("c2df0244-0a21-4f9c-8e64-7eef17a6e89d")
    val USER_EMAIL: String = "email"
    val USER_EMAIL_DISABLED: String = "emailDisabled"
    val USER_PASSWORD: String = "passworD1"
    val USER_AUTH: String = "test"
    val USER_EXPECTED: User = User(USER_ID, USER_EMAIL, USER_PASSWORD, USER_AUTH, emptyList(), false)
    val USER_DISABLED: User = User(USER_ID2, USER_EMAIL_DISABLED, USER_PASSWORD, USER_AUTH, emptyList(), false)

    @Autowired
    lateinit var flyway: Flyway

    @Autowired
    lateinit var dslContext: DSLContext

    @Autowired
    lateinit var userRepository: UserRepository

    @BeforeAll
    fun init() {
        flyway.clean()
        flyway.migrate()

        dslContext.insertInto(USER, USER.ID, USER.EMAIL, USER.PASSWORD, USER.AUTH_PROVIDER, USER.ENABLED)
            .values(USER_EXPECTED.id, USER_EXPECTED.email, USER_EXPECTED.password, USER_EXPECTED.authProvider, USER_EXPECTED.enabled)
            .returningResult(USER.ID, USER.EMAIL, USER.PASSWORD, USER.AUTH_PROVIDER, USER.ENABLED)
            .fetchOne()
        dslContext.insertInto(USER, USER.ID, USER.EMAIL, USER.PASSWORD, USER.AUTH_PROVIDER, USER.ENABLED)
            .values(USER_DISABLED.id, USER_DISABLED.email, USER_DISABLED.password, USER_DISABLED.authProvider, USER_DISABLED.enabled)
            .returningResult(USER.ID, USER.EMAIL, USER.PASSWORD, USER.AUTH_PROVIDER, USER.ENABLED)
            .fetchOne()
    }

    @Test
    fun `get user by email should return user if exists`() {
        val user = userRepository.getUserByEmail(USER_EMAIL)

        assertEquals(user, USER_EXPECTED)
    }

    @Test
    fun `get user by email should throw an exception if user does not exist`() {
        assertFailsWith<UsernameNotFoundException>(message = "User not found with email : email2") {
            userRepository.getUserByEmail("email2")
        }
    }

    @Test
    fun `find user by email should return optional of user`() {
        val user = userRepository.findUserByEmail(USER_EMAIL)

        assertEquals(user.isPresent, true)
        assertEquals(user.get(), USER_EXPECTED)
    }

    @Test
    fun `find user by email should return empty otpional if user does not exist`() {
        val user = userRepository.findUserByEmail("email2")

        assertEquals(user.isPresent, false)
    }

    @Test
    fun `save user should save user and return it`() {
        val user = userRepository.save("newEmail", USER_PASSWORD, USER_AUTH, true)

        assertEquals(user.email, "newEmail")
        assertEquals(user.password, USER_PASSWORD)
        assertEquals(user.authProvider, USER_AUTH)
        assertEquals(user.enabled, true)

        // Check with inserted user
        val userInserted = userRepository.getUserById(user.id)
        assertEquals(user, userInserted)
    }

    @Test
    fun `edit password should change user password if exists`() {
        val userWithPassword = userRepository.getUserByEmail(USER_EMAIL_DISABLED)
        assertEquals(userWithPassword.password, USER_PASSWORD)

        val edited = userRepository.editPassword(USER_EMAIL_DISABLED, "passworD2")
        assertEquals(edited, 1)

        // Check with inserted user
        val userEdited = userRepository.getUserByEmail(USER_EMAIL_DISABLED)
        assertEquals(userEdited.password, "passworD2")
    }

    @Test
    fun `edit password should do nothing if user does not exist`() {
        val edited = userRepository.editPassword("email3", "passworD3")
        assertEquals(edited, 0)
    }

    @Test
    fun `switch enabled for user should set enable on user`() {
        val userBeforeSwitch = userRepository.getUserByEmail(USER_EMAIL_DISABLED)
        assertEquals(userBeforeSwitch.enabled, false)

        val edited = userRepository.switchEnabledForUser(USER_EMAIL_DISABLED, true)
        assertEquals(edited, 1)

        // Check with inserted user
        val userEdited = userRepository.getUserByEmail(USER_EMAIL_DISABLED)
        assertEquals(userEdited.enabled, true)
    }

    @Test
    fun `switch enabled for user should do nothing if user does not exist`() {
        val edited = userRepository.switchEnabledForUser("email3", false)
        assertEquals(edited, 0)
    }

    @Test
    fun `get user by id should return user if exists`() {
        val user = userRepository.getUserById(USER_ID)

        assertEquals(user, USER_EXPECTED)
    }

    @Test
    fun `get user by id should throw an exception if user does not exist`() {
        val id = UUID.randomUUID()

        assertFailsWith<UsernameNotFoundException>(message = "User not found with email : $id") {
            userRepository.getUserById(id)
        }
    }

    @Test
    fun `get users return the list of all users`() {
        val users = userRepository.getUsers()

        assertEquals(users.size, 4)
        val ids = users.map { user -> user.email }
        assertThat(ids).containsExactlyInAnyOrder("admin@rexa.fr", "user@rexa.fr", USER_EMAIL, USER_EMAIL_DISABLED)
    }

}
