package fr.yvbro.rexa.security

import fr.yvbro.rexa.config.AppProperties
import fr.yvbro.rexa.model.role.ADMIN
import io.jsonwebtoken.*
import org.slf4j.LoggerFactory
import org.springframework.security.core.Authentication
import java.security.SignatureException
import java.util.*
import kotlin.collections.HashMap

class TokenProvider(private var appProperties: AppProperties) {
    private val REXA_APP: String = "ReXA"

    fun createToken(authentication: Authentication): String {
        val user = authentication.principal as UserPrincipal
        val expiryDate = Date(Date().time + getExpirationTime())
        return Jwts.builder()
                .setClaims(buildUserClaims(user))
                .setIssuedAt(Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.appTokenSecret)
                .compact()
    }

    private fun buildUserClaims(user: UserPrincipal): HashMap<String, Any?> {
        val isAdmin : Boolean = user.authorities.any { authority -> authority.authority == ADMIN }
        return hashMapOf(
                "iss" to REXA_APP,
                "sub" to user.id.toString(),
                "username" to user.username,
                "xnatUser" to user.xnatUsername,
                "xnatHost" to user.xnatHost,
                "isAdmin" to isAdmin
                )
    }

    fun getExpirationTime(): Int {
        return appProperties.appTokenExpirationMsec.toInt()
    }

    fun getUserIdFromToken(token: String?): UUID? {
        val claims: Claims = Jwts.parser()
                .setSigningKey(appProperties.appTokenSecret)
                .parseClaimsJws(token)
                .body
        return UUID.fromString(claims.subject)
    }

    fun validateToken(authToken: String?): Boolean {
        try {
            Jwts.parser().setSigningKey(appProperties.appTokenSecret).parseClaimsJws(authToken)
            return true
        } catch (ex: SignatureException) {
            logger.error("Invalid JWT signature")
        } catch (ex: MalformedJwtException) {
            logger.error("Invalid JWT token")
        } catch (ex: ExpiredJwtException) {
            logger.error("Expired JWT token")
        } catch (ex: UnsupportedJwtException) {
            logger.error("Unsupported JWT token")
        } catch (ex: IllegalArgumentException) {
            logger.error("JWT claims string is empty.")
        }
        return false
    }

    companion object {
        private val logger = LoggerFactory.getLogger(TokenProvider::class.java)
    }
}
