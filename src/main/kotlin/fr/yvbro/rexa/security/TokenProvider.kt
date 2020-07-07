package fr.yvbro.rexa.security

import fr.yvbro.rexa.config.AppProperties
import io.jsonwebtoken.*
import org.slf4j.LoggerFactory
import org.springframework.security.core.Authentication
import java.security.SignatureException
import java.util.*

class TokenProvider(private var appProperties: AppProperties) {
    fun createToken(authentication: Authentication): String {
        val userPrincipal = authentication.principal as UserPrincipal
        val expiryDate = Date(Date().time + appProperties.appTokenExpirationMsec.toInt())
        return Jwts.builder()
                .setSubject(userPrincipal.id.toString())
                .setIssuedAt(Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.appTokenSecret)
                .compact()
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
