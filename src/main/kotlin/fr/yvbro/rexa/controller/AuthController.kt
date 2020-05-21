package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig.Companion.AUTH_CONTEXT_PATH
import fr.yvbro.rexa.controller.input.UserInput
import fr.yvbro.rexa.service.UserService
import org.mindrot.jbcrypt.BCrypt
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(AUTH_CONTEXT_PATH)
class AuthController(private val userService: UserService) {

    @PostMapping("/login")
    fun authentication(@RequestBody user: UserInput) {
        userService.verifyUser(user)
    }

    @PostMapping("/sign-up")
    fun signUp(@RequestBody user: UserInput) {
        user.password = BCrypt.hashpw(user.password, BCrypt.gensalt())
        userService.saveUser(user)
    }

    @GetMapping("/userinfo")
    fun getUser(@AuthenticationPrincipal principal: OAuth2User): String? {
        return principal.getAttribute("name")
    }
}
