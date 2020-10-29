package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig
import fr.yvbro.rexa.controller.input.UserSwitchEnabledRequest
import fr.yvbro.rexa.controller.output.UserDto
import fr.yvbro.rexa.model.role.ADMIN
import fr.yvbro.rexa.service.UserService
import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(WebConfig.FRONT_CONTEXT_PATH + "/management/users")
@Secured(ADMIN)
class UsersManagementFrontController(private val userService: UserService) {

    @GetMapping
    fun getUsers(): List<UserDto> {
        return userService.getUsers()
                .map{ it.toOutput()}
    }

    @PostMapping("/switch")
    fun disableUser(@RequestBody userSwitchEnabledrequest: UserSwitchEnabledRequest) {
        userService.switchEnabledForUser(userSwitchEnabledrequest.userEmail, userSwitchEnabledrequest.enabled)
    }
}
