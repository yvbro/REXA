package fr.yvbro.rexa.controller

import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthentificationController(private val userService: UserService) {

    @PostMapping("/login")
    fun authentification(@RequestBody user: User) {
        userService.verifyUser(user)
    }

}
