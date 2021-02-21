package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig
import fr.yvbro.rexa.controller.input.AddUserRequest
import fr.yvbro.rexa.controller.input.UserChangePasswordRequest
import fr.yvbro.rexa.controller.input.UserSettingsRequest
import fr.yvbro.rexa.controller.input.UserSwitchEnabledRequest
import fr.yvbro.rexa.controller.output.UserDto
import fr.yvbro.rexa.model.User
import fr.yvbro.rexa.model.role.ADMIN
import fr.yvbro.rexa.service.UserService
import org.springframework.http.MediaType
import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.*
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort

@RestController
@RequestMapping(WebConfig.FRONT_CONTEXT_PATH + "/management/users")
@Secured(ADMIN)
class UsersManagementFrontController(private val userService: UserService) {

    @GetMapping
    fun getUsers(): List<UserDto> {
        return userService.getUsers()
                .map { it.toOutput() }
    }

    @GetMapping("/page", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getUsersByPage(@RequestParam(required = false, defaultValue = "0") page: Int,
                       @RequestParam(required = false, defaultValue = "10") size: Int,
                       @RequestParam(required = false, defaultValue = "id") sort: String
    ): Page<UserDto> {
        return userService.getUsersPaginate(PageRequest.of(page, size, Sort.by(sort))).map { it.toOutput() }
    }

    @PostMapping("/switch")
    fun disableUser(@RequestBody userSwitchEnabledRequest: UserSwitchEnabledRequest) {
        userService.switchEnabledForUser(userSwitchEnabledRequest.userEmail, userSwitchEnabledRequest.enabled)
    }

    @PostMapping("/add")
    fun addUser(@RequestBody addUserRequest: AddUserRequest) {
        userService.addUser(addUserRequest.email, addUserRequest.password)
    }

    @PostMapping("/edit")
    fun updateUserSettings(@RequestBody userChangePasswordRequest: UserChangePasswordRequest) {
        userService.editPassword(userChangePasswordRequest)
    }
}
