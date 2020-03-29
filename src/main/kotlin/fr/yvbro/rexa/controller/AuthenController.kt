package fr.yvbro.rexa.controller

import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class AuthenController(private val userService: UserService) {

    @PostMapping("/login")
    fun postAuthen(@RequestBody user: User): String{
        return userService.authenUser(user.email).toString()
    }

}
