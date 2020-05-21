package fr.yvbro.rexa.service

import fr.yvbro.rexa.controller.input.UserInput
import fr.yvbro.rexa.exception.RexaAuthentificationFailedException
import fr.yvbro.rexa.repository.UserRepository
import org.mindrot.jbcrypt.BCrypt
import org.springframework.stereotype.Service

@Service
class UserService(private var userRepository: UserRepository) {

    fun verifyUser(user: UserInput) {

        val userGet = user.email?.let { userRepository.getUserByEmail(it) }

        if (!BCrypt.checkpw(user.password, userGet?.password)) {
            throw RexaAuthentificationFailedException()
        }
    }

    fun saveUser(user: UserInput){
        user.password?.let { user.email?.let { it1 -> userRepository.save(it1, it) } };
    }

}
