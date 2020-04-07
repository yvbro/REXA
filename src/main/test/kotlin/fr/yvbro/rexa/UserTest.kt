package fr.yvbro.rexa

import fr.yvbro.rexa.exception.RexaAuthentificationFailedException
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.service.UserService
import org.junit.jupiter.api.*
import org.mindrot.jbcrypt.BCrypt
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.springframework.boot.test.context.SpringBootTest


@Tag("unitTest")
@DisplayName("class User")
@SpringBootTest
class UserTest {


    @Nested
    inner class UserServiceTest
    {

        @InjectMocks
        lateinit var userService: UserService

        @Mock
        lateinit var userRepository: UserRepository

        @BeforeEach
        fun setMock() {
            val bCrypt = mock(BCrypt::class.java)
            var goodUserFromRepository = User("beber@gmail.com","\$2a\$04\$/FCeArg6BcWT7tYqChau5uhLlVaxOa4c6v5gO19mTAEW/4BPMXWiy")

            `when`(userRepository.getUserByEmail(any())).thenReturn(goodUserFromRepository)
        }

        @Test
        fun `If we have the same password, we don't throw exception`() {
            val user: User = User("beber@gmail.com", "beber")

            userService.verifyUser(user)

            assertDoesNotThrow { RexaAuthentificationFailedException() }
        }

        @Test
        fun `return 401 if the password is not good`() {
            val user: User = User("beber@gmail.com", "beber13")

            // when
            val action = { userService.verifyUser(user) }

            // then
            assertThrows<RexaAuthentificationFailedException>(action)
        }
    }

}
