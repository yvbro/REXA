package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig
import fr.yvbro.rexa.controller.input.UserSettingsRequest
import fr.yvbro.rexa.controller.input.XnatSettingsRequest
import fr.yvbro.rexa.model.role.ADMIN
import fr.yvbro.rexa.model.role.USER
import fr.yvbro.rexa.security.UserPrincipal
import fr.yvbro.rexa.service.UserSettingsService
import org.springframework.security.access.annotation.Secured
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(WebConfig.FRONT_CONTEXT_PATH)
@Secured(ADMIN, USER)
class UserSettingsFrontController(private val userSettingsService: UserSettingsService) {

    @PostMapping("/xnat/settings")
    fun updateXnatSettings(@RequestBody xnatSettingsRequest: XnatSettingsRequest) {
        val userId = (SecurityContextHolder.getContext().authentication.principal as UserPrincipal).id
        userSettingsService.upsertXnatSettings(userId, xnatSettingsRequest.xnatUsername, xnatSettingsRequest.xnatHost, xnatSettingsRequest.xnatPassword)
    }

    @PostMapping("/user/settings")
    fun updateUserSettings(@RequestBody userSettingsRequest: UserSettingsRequest) {
        userSettingsService.upsertUserSettings(userSettingsRequest)
    }
}
