package fr.yvbro.rexa.service;

import fr.yvbro.rexa.controller.input.UserChangePasswordRequest
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.model.AuthProvider
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.model.role.USER
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.repository.UserRoleRepository
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.dao.DuplicateKeyException
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import java.util.*
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

@SpringBootTest
class UserServiceTest {

    private val TEST_EMAIL: String = "test@gmail.com"
    private val TEST_PASSWORD: String = "Password1"

    @InjectMocks
    lateinit var userService: UserService

    @Mock
    lateinit var userRepository: UserRepository

    @Mock
    lateinit var userRoleRepository: UserRoleRepository

    @Mock
    lateinit var passwordService: PasswordService

    @Test
    fun `getUsers returns users with roles`() {
        val userId1 = UUID.randomUUID()
        val userId2 = UUID.randomUUID()
        val user1 = User(userId1, TEST_EMAIL, TEST_PASSWORD, AuthProvider.Local.toString(), emptyList(), true)
        val user2 = User(userId2, "test2@gmail.com", "Password2", AuthProvider.Local.toString(), emptyList(), true)
        Mockito.`when`(userRepository.getUsers()).thenReturn(listOf(user1, user2))
        Mockito.`when`(userRoleRepository.getUserRoles()).thenReturn(mapOf(userId1 to listOf("ADMIN"), userId2 to listOf("USER")))

        user1.userRoles = listOf("ADMIN")
        user2.userRoles = listOf("USER")
        assertEquals(userService.getUsers(), listOf(user1, user2))
    }

    @Test
    fun `getUsersPaginate returns users with roles with pagination`() {
        val userId1 = UUID.randomUUID()
        val userId2 = UUID.randomUUID()
        val userId3 = UUID.randomUUID()
        val userId4 = UUID.randomUUID()
        val user1 = User(userId1, TEST_EMAIL, TEST_PASSWORD, AuthProvider.Local.toString(), emptyList(), true)
        val user2 = User(userId2, "test2@gmail.com", "Password2", AuthProvider.Local.toString(), emptyList(), true)
        val user3 = User(userId3, "test3@gmail.com", "Password3", AuthProvider.Local.toString(), emptyList(), true)
        val user4 = User(userId4, "test5@gmail.com", "Password4", AuthProvider.Local.toString(), emptyList(), true)
        var pageable = PageRequest.of(0, 10, Sort.by("id"))
        Mockito.`when`(userRepository.getUsersByPage(pageable)).thenReturn(PageImpl(listOf(user1, user2, user3, user4), pageable, 4))
        Mockito.`when`(userRoleRepository.getUserRoles()).thenReturn(mapOf(userId1 to listOf("ADMIN"), userId2 to listOf("USER"), userId3 to listOf("USER"), userId4 to listOf("USER")))

        user1.userRoles = listOf("ADMIN")
        user2.userRoles = listOf("USER")
        user3.userRoles = listOf("USER")
        user4.userRoles = listOf("USER")
        assertEquals(userService.getPaginatedUsers(pageable), PageImpl(listOf(user1, user2, user3, user4), pageable, 4))
    }


    @Test
    fun `switchEnabledForUser call repository method if email and enabled given`() {
        userService.switchEnabledForUser(TEST_EMAIL, true)

        verify(userRepository, times(1)).switchEnabledForUser(TEST_EMAIL, true)
    }

    @Test
    fun `switchEnabledForUser throws an exception if email is null`() {
        assertFailsWith<RexaBadRequestException> ("The email or enabled can not be null"){
            userService.switchEnabledForUser(null, true)
        }
    }

    @Test
    fun `switchEnabledForUser throws an exception if enabled is null`() {
        assertFailsWith<RexaBadRequestException> ("The email or enabled can not be null"){
            userService.switchEnabledForUser(TEST_EMAIL, null)
        }
    }

    @Test
    fun `addUser should insert user and roles with only user`() {
        val userId = UUID.randomUUID()
        Mockito.`when`(passwordService.encodePassword(TEST_PASSWORD)).thenReturn(TEST_PASSWORD)
        Mockito.`when`(userRepository.save(TEST_EMAIL, TEST_PASSWORD, AuthProvider.Local.toString(), false)).thenReturn(
            User(userId, "test1@gmail.com", TEST_PASSWORD, AuthProvider.Local.toString(), emptyList(), true)
        )

        userService.addUser(TEST_EMAIL, TEST_PASSWORD)

        verify(userRoleRepository, times(1)).saveRolesForUser(userId, listOf(USER))
    }

    @Test
    fun `addUser throws an exception if email already used`() {
        Mockito.`when`(passwordService.encodePassword(TEST_PASSWORD)).thenReturn(TEST_PASSWORD)
        Mockito.`when`(userRepository.save(TEST_EMAIL, TEST_PASSWORD, AuthProvider.Local.toString(), false)).thenThrow(
            DuplicateKeyException::class.java
        )
        assertFailsWith<RexaBadRequestException> ("email already used"){
            userService.addUser(TEST_EMAIL, TEST_PASSWORD)
        }
    }

    @Test
    fun `addUser throws an exception if email is null`() {
        assertFailsWith<RexaBadRequestException> ("The email or password can not be null"){
            userService.addUser(null, "password")
        }
    }

    @Test
    fun `addUser throws an exception if password is null`() {
        assertFailsWith<RexaBadRequestException> ("The email or password can not be null"){
            userService.addUser(TEST_EMAIL, null)
        }
    }

    @Test
    fun `editPassword throws an exception if no update`() {
        val request = UserChangePasswordRequest(TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD)
        Mockito.`when`(passwordService.encodePassword(TEST_PASSWORD)).thenReturn(TEST_PASSWORD)
        Mockito.`when`(userRepository.editPassword(TEST_EMAIL, TEST_PASSWORD)).thenReturn(0)

        assertFailsWith<RexaBadRequestException> ("Password not changed for user $TEST_EMAIL"){
            userService.editPassword(request)
        }
    }

    @Test
    fun `editPassword should verify password and encode the new one`() {
        val request = UserChangePasswordRequest(TEST_EMAIL, TEST_PASSWORD, TEST_PASSWORD)
        Mockito.`when`(passwordService.encodePassword(TEST_PASSWORD)).thenReturn(TEST_PASSWORD)
        Mockito.`when`(userRepository.editPassword(TEST_EMAIL, TEST_PASSWORD)).thenReturn(1)

        userService.editPassword(request)

        verify(passwordService, times(1)).checkConfirmationPassword(TEST_PASSWORD, TEST_PASSWORD)
        verify(passwordService, times(1)).checkPasswordRules(TEST_PASSWORD)
        verify(passwordService, times(1)).encodePassword(TEST_PASSWORD)
        verify(userRepository, times(1)).editPassword(TEST_EMAIL, TEST_PASSWORD)
    }
}
