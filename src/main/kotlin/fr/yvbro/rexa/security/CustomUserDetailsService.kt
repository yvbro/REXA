package fr.yvbro.rexa.security

import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.model.UserSettings
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.repository.UserRoleRepository
import fr.yvbro.rexa.repository.UserSettingsRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class CustomUserDetailsService(private val userRepository: UserRepository,
                               private val userRoleRepository: UserRoleRepository,
                               private val settingsRepository: UserSettingsRepository) : UserDetailsService {

    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(email: String): UserPrincipal {
        val user: User = userRepository.getUserByEmail(email)
        val userRoles: List<String> = userRoleRepository.getRolesForUserId(user.id)
        val userSettings: UserSettings = settingsRepository.getSettingsByUserId(user.id)
        return UserPrincipal.create(user, userRoles, userSettings)
    }

    @Transactional
    fun loadUserById(id: UUID?): UserPrincipal {
        val user: User = userRepository.getUserById(id)
        val userRoles: List<String> = userRoleRepository.getRolesForUserId(user.id)
        val userSettings: UserSettings = settingsRepository.getSettingsByUserId(id)
        return UserPrincipal.create(user, userRoles, userSettings)
    }
}
