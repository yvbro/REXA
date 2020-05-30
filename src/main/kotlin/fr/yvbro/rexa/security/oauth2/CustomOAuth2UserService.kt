package fr.yvbro.rexa.security.oauth2

import fr.yvbro.rexa.exception.RexaAuthentificationFailedException
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.security.TokenAuthenticationFilter
import fr.yvbro.rexa.security.UserPrincipal
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.InternalAuthenticationServiceException
import org.springframework.security.core.AuthenticationException
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.OAuth2AuthenticationException
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Component
import org.springframework.util.StringUtils

@Component
class CustomOAuth2UserService(private val userRepository: UserRepository): DefaultOAuth2UserService() {

    @Throws(OAuth2AuthenticationException::class)
    override fun loadUser(oAuth2UserRequest: OAuth2UserRequest): OAuth2User? {
        val oAuth2User = super.loadUser(oAuth2UserRequest)
        return try {
            processOAuth2User(oAuth2UserRequest, oAuth2User)
        } catch (ex: AuthenticationException) {
            throw ex
        } catch (ex: Exception) {
            throw InternalAuthenticationServiceException(ex.message, ex.cause)
        }
    }

    private fun processOAuth2User(oAuth2UserRequest: OAuth2UserRequest, oAuth2User: OAuth2User): OAuth2User? {
        val oAuth2UserInfo = OAuth2UserInfo(oAuth2User.attributes)
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            logger.warn("Email not found from OAuth2 provider")
            throw RexaAuthentificationFailedException()
        }
        val user = userRepository.getUserByEmail(oAuth2UserInfo.getEmail())
        if (!user.authProvider.equals(oAuth2UserRequest.clientRegistration.registrationId)) {
            throw RexaAuthentificationFailedException()
        }

        return UserPrincipal.create(user, oAuth2User.attributes)
    }

    companion object {
        private val logger = LoggerFactory.getLogger(TokenAuthenticationFilter::class.java)
    }
}
