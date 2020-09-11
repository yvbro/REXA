package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig
import fr.yvbro.rexa.controller.mapper.mapToUserDto
import fr.yvbro.rexa.controller.output.UserDto
import fr.yvbro.rexa.service.UserService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(WebConfig.FRONT_CONTEXT_PATH)
class UsersManagementFrontController(private val userService: UserService) {

    @RequestMapping("/management/users")
    fun getUsers(): List<UserDto> {
        return mapToUserDto(userService.getUsers())
    }
}