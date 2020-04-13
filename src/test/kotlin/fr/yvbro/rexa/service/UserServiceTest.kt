package fr.yvbro.rexa.service

import fr.yvbro.rexa.exception.RexaAuthentificationFailedException
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.repository.UserRepository
import org.junit.jupiter.api.*
import org.mindrot.jbcrypt.BCrypt
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.springframework.boot.test.context.SpringBootTest

@Tag("unitTest")
@DisplayName("Service User class test")
@SpringBootTest
class UserServiceTest {

    @InjectMocks
    lateinit var userService: UserService

    @Mock
    lateinit var userRepository: UserRepository

    @BeforeEach
    fun setMock() {
        val bCrypt = mock(BCrypt::class.java)
        var goodUserFromRepository = User("beber@gmail.com", "\$2a\$04\$/FCeArg6BcWT7tYqChau5uhLlVaxOa4c6v5gO19mTAEW/4BPMXWiy")

        `when`(userRepository.getUserByEmail(any())).thenReturn(goodUserFromRepository)
    }

    @Test
    @DisplayName("If the User is right, we don't throw an exception")
    fun verifyUser_with_good_credentials_should_work() {
        val user: User = User("beber@gmail.com", "beber")

        userService.verifyUser(user)

        assertDoesNotThrow { RexaAuthentificationFailedException() }

        verify(userRepository,times(1)).getUserByEmail(user)
    }

    @Test
    @DisplayName("If wrong credentials, should return an exception")
    fun verifyUser_with_wrong_credentials_should_return_RexaAuthentificationFailedException() {
        val user: User = User("beber@gmail.com", "beber13")

        val action = { userService.verifyUser(user) }

        assertThrows<RexaAuthentificationFailedException>(action)

        verify(userRepository,times(1)).getUserByEmail(user)
    }
}
