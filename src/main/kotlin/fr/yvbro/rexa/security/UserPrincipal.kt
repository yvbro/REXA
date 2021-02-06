package fr.yvbro.rexa.security

import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.model.UserSettings
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.oauth2.core.user.OAuth2User
import java.util.*

class UserPrincipal(val id: UUID?, private val email: String?, private val password: String?,
                    private val authorities: Collection<GrantedAuthority>,
                    private val enabled: Boolean?, val xnatUsername: String?,
                    val xnatHost: String?, val authProvider: String?) : OAuth2User, UserDetails {
    private var attributes: Map<String, Any>? = null

    override fun getPassword(): String? {
        return password
    }

    override fun getUsername(): String? {
        return email
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        if (enabled != null) {
            return enabled
        }
        return false
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }

    override fun getAttributes(): Map<String, Any> {
        return attributes!!
    }

    fun setAttributes(attributes: Map<String, Any>?) {
        this.attributes = attributes
    }

    override fun getName(): String {
        return id.toString()
    }

    companion object {
        fun create(user: User, userRoles: List<String>, userSettings: UserSettings): UserPrincipal {
            val authorities: List<GrantedAuthority> = userRoles.map { role -> SimpleGrantedAuthority(role) }

            return UserPrincipal(
                    user.id,
                    user.email,
                    user.password,
                    authorities,
                    user.enabled,
                    userSettings.xnatUsername,
                    userSettings.xnatHost,
                    user.authProvider
            )
        }

        fun create(user: User, userRoles: List<String>, userSettings: UserSettings, attributes: Map<String, Any>?): UserPrincipal {
            val userPrincipal = create(user, userRoles, userSettings)
            userPrincipal.setAttributes(attributes)
            return userPrincipal
        }
    }

}
