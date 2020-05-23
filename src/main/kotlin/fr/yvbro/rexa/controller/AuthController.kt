package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig.Companion.AUTH_CONTEXT_PATH
import fr.yvbro.rexa.controller.input.LoginRequest
import fr.yvbro.rexa.controller.output.AuthResponse
import fr.yvbro.rexa.exception.RexaUnauthorizedException
import fr.yvbro.rexa.repository.UserRepository
import fr.yvbro.rexa.security.TokenProvider
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping(AUTH_CONTEXT_PATH)
class AuthController(private val authenticationManager: AuthenticationManager,
                     private val tokenProvider: TokenProvider,
                     private val userRepository: UserRepository) {

    @PostMapping("/login")
    fun authentication(@RequestBody loginRequest: LoginRequest): ResponseEntity<Any> {
        val authentication: Authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                        loginRequest.email,
                        loginRequest.password
                )
        )

        SecurityContextHolder.getContext().authentication = authentication

        val token: String = tokenProvider.createToken(authentication)
        return ResponseEntity.ok<Any>(AuthResponse(token))
    }

    @GetMapping("/userinfo")
    fun getUser(): String? {
        val authentication = SecurityContextHolder.getContext().authentication
        if (authentication !is AnonymousAuthenticationToken) {
            return authentication.name
        }
        throw RexaUnauthorizedException()
    }
}
