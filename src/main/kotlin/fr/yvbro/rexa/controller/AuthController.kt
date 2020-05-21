package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig.Companion.AUTH_CONTEXT_PATH
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.service.UserService
import org.mindrot.jbcrypt.BCrypt
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping(AUTH_CONTEXT_PATH)
class AuthController(private val userService: UserService) {

    @PostMapping("/login")
    fun authentication(@RequestBody user: User) {
        userService.verifyUser(user)
    }

    @PostMapping("/sign-up")
    fun signUp(@RequestBody user: User) {
        user.password = BCrypt.hashpw(user.password,BCrypt.gensalt())
        userService.saveUser(user)
    }

    @GetMapping("/userinfo")
    fun user(@AuthenticationPrincipal principal: OAuth2User): Map<String, Any?>? {
        return Collections.singletonMap("name", principal.getAttribute("name"))
    }
}
