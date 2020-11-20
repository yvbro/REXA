package fr.yvbro.rexa.service

import fr.yvbro.rexa.config.Properties
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.model.AuthProvider
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.model.role.USER
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.repository.UserRoleRepository
import fr.yvbro.rexa.security.AESEncryptionDecryption
import org.springframework.dao.DuplicateKeyException
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository,
                  private val userRoleRepository: UserRoleRepository,
                  private val securityConfiguration: AESEncryptionDecryption,
                  private val properties: Properties) {

    fun getUsers(): List<User> {
        val users = userRepository.getUsers().toMutableList()
        val roles = userRoleRepository.getUserRoles()
        users.map { it.userRoles = roles[it.id]!! }
        return users
    }

    fun switchEnabledForUser(userEmail: String?, enabled: Boolean?) {
        if (userEmail != null && enabled != null) {
            userRepository.switchEnabledForUser(userEmail, enabled)
        } else {
            throw RexaBadRequestException(String.format("The input can not be null: %s / %s", userEmail, enabled))
        }
    }

    fun addUser(email: String?, password: String?) {
        if (email != null && password != null) {
            val user: User
            try {
                user = userRepository.save(email, securityConfiguration.encrypt(password, properties.secret), AuthProvider.Local.toString(), false)
            } catch (e: DuplicateKeyException) {
                throw RexaBadRequestException("email already used")
            }
            userRoleRepository.saveRolesForUser(user.id!!, listOf(USER))
        } else {
            throw RexaBadRequestException("The input can not be null")
        }
    }
}
