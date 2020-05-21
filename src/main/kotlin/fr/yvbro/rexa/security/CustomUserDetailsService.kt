package fr.yvbro.rexa.security

import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class CustomUserDetailsService(private val userRepository: UserRepository) : UserDetailsService {

    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(email: String): UserDetails {
        val user: User = userRepository.getUserByEmail(email)
        return UserPrincipal.create(user)
    }

    @Transactional
    fun loadUserById(id: UUID?): UserDetails {
        val user: User = userRepository.getUserById(id)
        return UserPrincipal.create(user)
    }
}
