package fr.yvbro.rexa.service

import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.repository.UserRoleRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository,
                  private val userRoleRepository: UserRoleRepository) {

    fun getUsers(): List<User> {
        val users = userRepository.getUsers().toMutableList()
        val roles = userRoleRepository.getUserRoles()
        users.map { it.userRoles = roles[it.id]!! }
        return users
    }

}
