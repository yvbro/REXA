package fr.yvbro.rexa.service

import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private var userRepository: UserRepository) {

    fun authenUser(userEmail: String?): Optional<User>? {


        return userRepository.getUserByEmail(userEmail)
    }
}
