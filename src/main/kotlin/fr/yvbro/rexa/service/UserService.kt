package fr.yvbro.rexa.service

import fr.yvbro.rexa.controller.input.UserChangePasswordRequest
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.model.AuthProvider
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.model.role.USER
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.repository.UserRoleRepository
import org.springframework.dao.DuplicateKeyException
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository,
                  private val userRoleRepository: UserRoleRepository,
                  private val passwordService: PasswordService) {

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
            passwordService.checkPasswordRules(password)
            val user: User
            try {
                user = userRepository.save(email, passwordService.encodePassword(password), AuthProvider.Local.toString(), false)
            } catch (e: DuplicateKeyException) {
                throw RexaBadRequestException("email already used")
            }
            userRoleRepository.saveRolesForUser(user.id!!, listOf(USER))
        } else {
            throw RexaBadRequestException("The email or the password can not be null.")
        }
    }

    fun editPassword(userChangePasswordRequest: UserChangePasswordRequest) {
        passwordService.checkConfirmationPassword(userChangePasswordRequest.newPassword, userChangePasswordRequest.confirmationPassword)
        passwordService.checkPasswordRules(userChangePasswordRequest.newPassword)

        val updated = userRepository.editPassword(userChangePasswordRequest.email, passwordService.encodePassword(userChangePasswordRequest.newPassword))
        if (updated == 0) {
            throw RexaBadRequestException("Password not changed for user {}", userChangePasswordRequest.email.toString())
        }
    }
}
