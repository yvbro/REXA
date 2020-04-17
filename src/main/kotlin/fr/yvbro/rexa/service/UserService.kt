package fr.yvbro.rexa.service

import fr.yvbro.rexa.exception.RexaAuthentificationFailedException
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.repository.UserRepository
import org.mindrot.jbcrypt.BCrypt
import org.springframework.stereotype.Service

@Service
class UserService(private var userRepository: UserRepository) {

    fun verifyUser(user: User?) {

        val userGet = userRepository.getUserByEmail(user)

        if (!BCrypt.checkpw(user?.password, userGet?.password)) {
            throw RexaAuthentificationFailedException()
        }
    }

    fun saveUser(user: User){
        userRepository.save(user);
    }

}
